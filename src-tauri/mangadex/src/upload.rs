mod queue;
mod sessions;

use std::{
    collections::HashMap,
    fs::File,
    io::{BufReader, BufWriter, Write},
    path::PathBuf,
    sync::Arc,
};

use futures_util::Stream;
use mangadex_api::{
    utils::upload::check_and_abandon_session_if_exists,
    v5::upload::upload_session_id::post::UploadImage,
};
use mangadex_api_schema_rust::v5::ChapterObject;
use queue::UploadQueue;
use serde::{Deserialize, Serialize};
use sessions::UploadSessions;
use tauri::{AppHandle, Emitter, EventId, Listener, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{
        Mutex, RwLock,
        mpsc::{UnboundedReceiver, unbounded_channel},
    },
    task::JoinHandle,
};
use uuid::Uuid;

pub use queue::{UploadQueueError, UploadQueueErrorKind, UploadSessionState};
pub use sessions::{
    CheckUploadSessionError, InternUploadSession, InternUploadSessionCommitData,
    InternUploadSessionGQLObject,
};

use crate::utils::traits_utils::MangadexTauriManagerExt;

type ArcRwLock<T> = Arc<RwLock<T>>;

const UPLOAD_MANAGER_EVENT_KEY: &str = "special-eureka://upload-manager-event";

#[derive(Clone, Debug)]
pub struct UploadManager<R>
where
    R: Runtime,
{
    sessions: UploadSessions,
    queue: UploadQueue,
    runner: Arc<Mutex<Option<JoinHandle<()>>>>,
    app: AppHandle<R>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum UploadManagerEventPayload {
    SessionListUpdate,
    QueueListUpdate,
    SessionUpdate { id: Uuid },
    QueueEntryUpdate { id: Uuid },
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl<R> UploadManager<R>
where
    R: Runtime,
{
    fn emit_manager_event(&self, e: UploadManagerEventPayload) -> tauri::Result<()> {
        self.app.emit(UPLOAD_MANAGER_EVENT_KEY, e)
    }
    async fn can_update_internal_session(&self, id: Uuid) -> bool {
        !matches!(
            self.queue.get_state(id).await,
            Some(UploadSessionState::Uploading)
        )
    }
    pub fn new(app_handle: AppHandle<R>) -> Self {
        Self {
            sessions: Default::default(),
            queue: Default::default(),
            runner: Default::default(),
            app: app_handle,
        }
    }
    pub async fn create_session(
        &self,
        manga_id: Uuid,
        groups: Option<Vec<Uuid>>,
    ) -> crate::Result<Uuid> {
        let session_id = Uuid::now_v7();
        let session = InternUploadSession {
            temp_dir: TempDir::new()?,
            commit_data: None,
            groups: groups.unwrap_or_default(),
            images: Default::default(),
            manga_id,
        };
        {
            let mut write = self.sessions.write().await;
            write.insert(session_id, session);
            self.app.emit(
                UPLOAD_MANAGER_EVENT_KEY,
                UploadManagerEventPayload::SessionListUpdate,
            )?;
        }
        Ok(session_id)
    }
    pub async fn send_session_in_queue(&self, session_id: Uuid) -> crate::Result<()> {
        {
            let read = self.sessions.read().await;
            match read.get(&session_id) {
                Some(intern) => {
                    intern.check()?;
                }
                None => {
                    return Err(crate::Error::InternalUploadSessionNotFound(session_id));
                }
            }
        }
        self.queue.push_entry(session_id).await?;
        self.emit_manager_event(UploadManagerEventPayload::QueueListUpdate)?;

        Ok(())
    }

    pub async fn start_queue_runner(&self) {
        let mut lock = self.runner.lock().await;
        if lock.as_ref().is_none() || lock.as_ref().is_some_and(|r| r.is_finished()) {
            let sessions = self.sessions.clone();
            let queue = self.queue.clone();
            let app = self.app.clone();
            lock.replace(tokio::spawn(async move {
                inner_runner(queue, sessions, app).await;
            }));
        }
    }
    pub async fn add_file_to_session(
        &self,
        session_id: Uuid,
        img_path: PathBuf,
        index: Option<u32>,
    ) -> crate::Result<()> {
        self.add_files_to_session(session_id, vec![img_path], index)
            .await
    }
    pub async fn add_files_to_session(
        &self,
        session_id: Uuid,
        paths: Vec<PathBuf>,
        mut index: Option<u32>,
    ) -> crate::Result<()> {
        if !self.can_update_internal_session(session_id).await {
            return Err(UploadQueueError::CurrentlyUploading(session_id).into());
        }
        let to_import = paths
            .into_iter()
            .flat_map(|path| {
                let extension = path
                    .extension()
                    .and_then(|d| d.to_str().map(String::from))?;

                Some((
                    format!(
                        "{}.{}",
                        {
                            use rand::distr::{Alphanumeric, SampleString};
                            let mut rng = rand::rng();
                            let mut filename = Alphanumeric.sample_string(&mut rng, 8);
                            filename.shrink_to_fit();
                            filename
                        },
                        extension
                    ),
                    path,
                ))
            })
            .collect::<Vec<_>>();
        {
            if let Some(i) = index {
                let read = self.sessions.read().await;
                let session = read
                    .get(&session_id)
                    .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
                if (session.images.len() as u32) <= i {
                    index = None;
                }
            }
        }
        {
            let mut write = self.sessions.write().await;
            let session = write
                .get_mut(&session_id)
                .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
            for (filename, path) in to_import {
                {
                    let mut image_file = File::create(session.temp_dir.path().join(&filename))?;
                    let mut to_copy = File::open(path)?;
                    {
                        let mut image_file = BufWriter::new(&mut image_file);
                        let mut to_copy = BufReader::new(&mut to_copy);
                        std::io::copy(&mut to_copy, &mut image_file)?;
                        image_file.flush()?;
                    }
                }
                if let Some(index) = index.as_mut() {
                    session.images.insert((*index) as _, filename);
                    *index += 1;
                } else {
                    session.images.push(filename);
                }
            }
        }
        self.emit_manager_event(UploadManagerEventPayload::SessionUpdate { id: session_id })?;
        Ok(())
    }
    pub async fn get_read_file_from_session(
        &self,
        session_id: Uuid,
        filename: String,
    ) -> crate::Result<File> {
        let read = self.sessions.read().await;
        let session = read
            .get(&session_id)
            .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
        Ok(File::open(session.temp_dir.path().join(filename))?)
    }
    pub async fn remove_file_from_session(
        &self,
        session_id: Uuid,
        filename: String,
    ) -> crate::Result<()> {
        self.remove_files_from_session(session_id, vec![filename])
            .await
    }
    pub async fn remove_files_from_session(
        &self,
        session_id: Uuid,
        filenames: Vec<String>,
    ) -> crate::Result<()> {
        if !self.can_update_internal_session(session_id).await {
            return Err(UploadQueueError::CurrentlyUploading(session_id).into());
        }
        {
            let mut write = self.sessions.write().await;
            let session = write
                .get_mut(&session_id)
                .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
            session.images.retain(|d| !filenames.contains(d));
            session.images.shrink_to_fit();
        }
        self.emit_manager_event(UploadManagerEventPayload::SessionUpdate { id: session_id })?;
        Ok(())
    }
    pub async fn get_intern_session_object(
        &self,
        session_id: Uuid,
    ) -> Option<InternUploadSessionGQLObject> {
        self.sessions
            .read()
            .await
            .get(&session_id)
            .map(|d| d.to_gql_object(session_id))
    }
    pub async fn get_session_queue_state(&self, session_id: Uuid) -> Option<UploadSessionState> {
        self.queue.get_state(session_id).await
    }
    pub async fn set_commit_data(
        &self,
        session_id: Uuid,
        commit_data: Option<InternUploadSessionCommitData>,
    ) -> crate::Result<()> {
        {
            let mut write = self.sessions.write().await;
            let session = write
                .get_mut(&session_id)
                .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
            session.commit_data = commit_data;
        }
        self.emit_manager_event(UploadManagerEventPayload::SessionUpdate { id: session_id })?;
        Ok(())
    }
    pub async fn set_commit_data_and_send_to_queue(
        &self,
        session_id: Uuid,
        commit_data: Option<InternUploadSessionCommitData>,
    ) -> crate::Result<()> {
        self.set_commit_data(session_id, commit_data).await?;
        self.send_session_in_queue(session_id).await?;
        Ok(())
    }

    pub async fn get_queue_order(&self) -> Vec<Uuid> {
        self.queue.get_queue_order().await
    }

    pub async fn swap(&self, a: Uuid, b: Uuid) -> crate::Result<()> {
        self.queue.swap(a, b).await?;
        self.emit_manager_event(UploadManagerEventPayload::QueueListUpdate)?;
        Ok(())
    }
    pub async fn remove_session(&self, session_id: Uuid) -> crate::Result<()> {
        if !self.can_update_internal_session(session_id).await {
            return Err(UploadQueueError::CurrentlyUploading(session_id).into());
        }
        self.sessions.write().await.remove(&session_id);
        self.emit_manager_event(UploadManagerEventPayload::SessionListUpdate)?;
        self.queue.remove(session_id).await;
        self.emit_manager_event(UploadManagerEventPayload::QueueListUpdate)?;
        Ok(())
    }
    pub fn event_stream(&self) -> crate::Result<UploadManagerEventStream<R>> {
        Ok(UploadManagerEventStream::new(self.app.clone())?)
    }
    pub async fn get_session_ids(&self) -> Vec<Uuid> {
        self.sessions.read().await.keys().copied().collect()
    }
    pub async fn swap_file_order(&self, session_id: Uuid, a: usize, b: usize) -> crate::Result<()> {
        {
            let mut write = self.sessions.write().await;
            let session = write
                .get_mut(&session_id)
                .ok_or(crate::Error::InternalUploadSessionNotFound(session_id))?;
            if a < session.images.len() && b < session.images.len() {
                session.images.swap(a, b);
            } else {
                log::error!("Out bounds a or b to swap file order");
            }
        }
        self.emit_manager_event(UploadManagerEventPayload::SessionUpdate { id: session_id })?;
        Ok(())
    }
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
async fn inner_runner<R>(queue: UploadQueue, sessions: UploadSessions, app: AppHandle<R>)
where
    R: Runtime,
{
    let mut index = 0_usize;
    while let Some((session_id, _)) = queue.get_at_index(index).await {
        let Ok(_) = queue
            .set_state(session_id, UploadSessionState::Uploading)
            .await
            .inspect_err(|err| {
                log::error!("{err}");
            })
        else {
            continue;
        };
        let _ = app.emit(
            UPLOAD_MANAGER_EVENT_KEY,
            UploadManagerEventPayload::QueueEntryUpdate { id: session_id },
        );
        match upload_intern_session(session_id, &sessions, &app).await {
            Err(err) => {
                let _ = queue
                    .set_state(session_id, UploadSessionState::Error(err.into()))
                    .await
                    .inspect_err(|e| {
                        log::error!("{e}");
                    });
                let _ = app.emit(
                    UPLOAD_MANAGER_EVENT_KEY,
                    UploadManagerEventPayload::QueueEntryUpdate { id: session_id },
                );
                index += 1;
            }
            Ok(_chapter) => {
                queue.remove_at_index(index).await;
                let _ = app.emit(
                    UPLOAD_MANAGER_EVENT_KEY,
                    UploadManagerEventPayload::QueueListUpdate,
                );
                {
                    let mut write = sessions.write().await;
                    write.remove(&session_id);
                }
                let _ = app.emit(
                    UPLOAD_MANAGER_EVENT_KEY,
                    UploadManagerEventPayload::SessionListUpdate,
                );
            }
        }
    }
}

const FILES_PER_PUT: u8 = 5;

#[cfg_attr(feature = "hotpath", hotpath::measure)]
async fn upload_intern_session<R>(
    internal_session_id: Uuid,
    sessions: &UploadSessions,
    app: &AppHandle<R>,
) -> crate::Result<ChapterObject>
where
    R: Runtime,
{
    {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        let rate_limit = app.get_specific_rate_limit()?;
        let _ = tokio::join!(rate_limit.get_upload(), rate_limit.delete_upload());
        check_and_abandon_session_if_exists(&client).await?;
    }

    let (md_session, (images_to_upload, file_name_order, mut files_ids, commit_data)) = tokio::try_join!(
        async {
            let client = app.get_mangadex_client_with_auth_refresh().await?;

            let mut endpoint = client.upload().begin().post();
            {
                let read = sessions.read().await;
                let internal_session = read.get(&internal_session_id).ok_or(
                    crate::Error::InternalUploadSessionNotFound(internal_session_id),
                )?;
                endpoint
                    .manga_id(internal_session.manga_id)
                    .groups(internal_session.groups.clone());
            }
            app.get_specific_rate_limit()?.begin_upload().await;
            Ok::<_, crate::Error>(endpoint.send().await?.body.data)
        },
        async {
            let read = sessions.read().await;
            let session = read.get(&internal_session_id).ok_or(
                crate::Error::InternalUploadSessionNotFound(internal_session_id),
            )?;
            Ok((
                session
                    .images
                    .iter()
                    .map(|path| session.temp_dir.path().join(path))
                    .collect::<Vec<_>>(),
                session.images.clone(),
                HashMap::<String, Uuid>::with_capacity(session.images.len()),
                session
                    .commit_data
                    .clone()
                    .ok_or(crate::Error::UploadCommitDataMissing(internal_session_id))?,
            ))
        }
    )?;

    for files in images_to_upload.chunks(FILES_PER_PUT as _) {
        let files = files
            .iter()
            .map(|p| UploadImage::try_from(p.to_path_buf()))
            .collect::<std::io::Result<Vec<UploadImage>>>()?;

        app.get_specific_rate_limit()?.upload_files().await;
        let client = app.get_mangadex_client_with_auth_refresh().await?;

        let mut endpoint = client.upload().upload_session_id(md_session.id).post();
        endpoint.files(files);
        let res = endpoint.send().await?;
        if !res.body.errors.is_empty() {
            return Err(crate::Error::UploadFilesError(res.body.errors));
        }
        for upload_file in res.data.iter() {
            files_ids.insert(
                upload_file.attributes.original_file_name.clone(),
                upload_file.id,
            );
        }
    }

    let chapter = {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        let mut endpoint = client
            .upload()
            .upload_session_id(md_session.id)
            .commit()
            .post();
        endpoint = endpoint
            .chapter(commit_data.chapter)
            .volume(commit_data.volume)
            .translated_language(commit_data.translated_language)
            .external_url(commit_data.external_url);
        if let Some(publish_date) = commit_data.publish_at {
            endpoint = endpoint.publish_at(publish_date);
        }
        if let Some(terms_accepted) = commit_data.terms_accepted {
            endpoint = endpoint.terms_accepted(terms_accepted);
        }
        let page_order = file_name_order
            .into_iter()
            .map(|filename| {
                files_ids
                    .get(&filename)
                    .copied()
                    .ok_or(crate::Error::FileNotYetUploaded(
                        filename,
                        internal_session_id,
                    ))
            })
            .collect::<crate::Result<Vec<_>>>()?;
        endpoint = endpoint.page_order(page_order);

        // TODO compliance

        app.get_specific_rate_limit()?.commit_upload().await;
        endpoint.send().await?
    };

    Ok(chapter.body.data)
}

pub struct UploadManagerEventStream<R>
where
    R: Runtime,
{
    app_handle: AppHandle<R>,
    rx: UnboundedReceiver<UploadManagerEventPayload>,
    event_id: EventId,
}

impl<R> UploadManagerEventStream<R>
where
    R: Runtime,
{
    pub fn new(app_handle: AppHandle<R>) -> tauri::Result<Self> {
        let (tx, rx) = unbounded_channel::<UploadManagerEventPayload>();
        let event_id =
            app_handle.listen(
                UPLOAD_MANAGER_EVENT_KEY,
                move |ev| match serde_json::from_str(ev.payload()) {
                    Ok(payload) => {
                        if let Err(err) = tx.send(payload) {
                            log::error!("{err}");
                        }
                    }
                    Err(err) => {
                        log::error!("{err}");
                    }
                },
            );
        Ok(Self {
            app_handle,
            rx,
            event_id,
        })
    }
}

impl<R> Drop for UploadManagerEventStream<R>
where
    R: Runtime,
{
    fn drop(&mut self) {
        self.app_handle.unlisten(self.event_id);
    }
}

impl<R> Unpin for UploadManagerEventStream<R> where R: Runtime {}

impl<R> Stream for UploadManagerEventStream<R>
where
    R: Runtime,
{
    type Item = UploadManagerEventPayload;
    fn poll_next(
        self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<Self::Item>> {
        let this = self.get_mut();
        this.rx.poll_recv(cx)
    }
}
