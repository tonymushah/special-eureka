mod queue;
mod sessions;

use std::sync::Arc;

use mangadex_api::{MangaDexClient, utils::upload::check_and_abandon_session_if_exists};
use queue::UploadQueue;
use serde::{Deserialize, Serialize};
use sessions::UploadSessions;
use tauri::{AppHandle, Emitter, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{Mutex, RwLock},
    task::JoinHandle,
};
use uuid::Uuid;

pub use queue::{UploadQueueError, UploadQueueErrorKind, UploadSessionState};
pub use sessions::{InternUploadSession, InternUploadSessionCommitData};

use crate::utils::traits_utils::MangadexTauriManagerExt;

type ArcRwLock<T> = Arc<RwLock<T>>;

const UPLOAD_MANAGER_EVENT_KEY: &str = "special-eureka://upload-manager-event";

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

impl<R> UploadManager<R>
where
    R: Runtime,
{
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
        if !self.sessions.read().await.contains_key(&session_id) {
            return Err(crate::Error::InternalUploadSessionNotFound(session_id));
        }
        self.queue.push_entry(session_id).await?;
        self.app.emit(
            UPLOAD_MANAGER_EVENT_KEY,
            UploadManagerEventPayload::QueueListUpdate,
        )?;
        {
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

        Ok(())
    }
}

async fn inner_runner<R>(queue: UploadQueue, sessions: UploadSessions, app: AppHandle<R>)
where
    R: Runtime,
{
    let Ok(client) = app
        .get_mangadex_client()
        .inspect_err(|e| log::error!("{e}"))
    else {
        return;
    };
    while let Some((session_id, _)) = queue.front().await {
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
        if let Err(err) = upload_intern_session(session_id, &queue, &sessions, &client).await {
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
        } else {
            queue.pop_front().await;
            let _ = app.emit(
                UPLOAD_MANAGER_EVENT_KEY,
                UploadManagerEventPayload::QueueListUpdate,
            );
            sessions.write().await.remove(&session_id);
            let _ = app.emit(
                UPLOAD_MANAGER_EVENT_KEY,
                UploadManagerEventPayload::SessionListUpdate,
            );
        }
    }
}

async fn upload_intern_session(
    id: Uuid,
    queue: &UploadQueue,
    sessions: &UploadSessions,
    client: &MangaDexClient,
) -> crate::Result<()> {
    todo!()
}
