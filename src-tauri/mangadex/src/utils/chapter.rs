use std::{
    collections::{HashMap, hash_map::Entry},
    fs::File,
    io::{self, BufWriter, Write},
    ops::Deref,
    path::{Path, PathBuf},
    sync::{Arc, RwLock, Weak},
    task::{Poll, ready},
    time::{Duration, Instant},
};

use async_graphql::ErrorExtensions;
use bytes::Buf;
use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use futures_util::Stream;
use mangadex_api_schema_rust::v5::AtHomeServer;
use tauri::{AppHandle, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::mpsc::{UnboundedReceiver, UnboundedSender, unbounded_channel},
    task::JoinHandle,
};
use url::Url;
use uuid::Uuid;

use crate::{
    store::types::enums::chapter_quality::DownloadMode as Mode,
    utils::traits_utils::MangadexTauriManagerExt,
};

#[derive(Debug, Clone, async_graphql::SimpleObject)]
pub struct ChapterPage {
    pub index: u32,
    pub pages: u32,
    pub url: Url,
}

enum Instructions {
    FetchMetadata,
    StartCaching,
    RefetchPage(u32),
}

#[derive(Debug, thiserror::Error, Clone)]
pub enum FetchingError {
    #[error("File not found {maybe_file}", maybe_file = if let Some(file) = .0 {
		file
	} else {
		""
	})]
    FileNotFound(Option<String>),
    #[error("Streaming error")]
    Streaming,
    #[error("Chapter pages is not found or not being fetched yet")]
    ChapterPagesDataNotFound,
    #[error("{0}")]
    Internal(String),
    #[error("Offline app state not loaded")]
    OfflineAppStateNotLoaded,
    #[error("Cannot load page {0} {errd}", errd = if let Some(err) = .1 {
		err
	} else {
		""
	})]
    PageLoading(u32, Option<String>),
    #[error(transparent)]
    Reqwest(Arc<reqwest::Error>),
    #[error("Page {} fetching error {}", .page,.err)]
    ReqwestPageFetching { err: Arc<reqwest::Error>, page: u32 },
    #[error("Page {} io error {}", .page, .err)]
    IoPage { err: Arc<std::io::Error>, page: u32 },
    #[error("Page {} url parse error {}", .page, .err)]
    ParsePageUrl {
        err: Arc<url::ParseError>,
        page: u32,
    },
}

impl From<reqwest::Error> for FetchingError {
    fn from(value: reqwest::Error) -> Self {
        Self::Reqwest(Arc::new(value))
    }
}

impl async_graphql::ErrorExtensions for FetchingError {
    fn extend(&self) -> async_graphql::Error {
        async_graphql::Error::new(self.to_string()).extend_with(|_, extion| match self {
            Self::PageLoading(d, _) => {
                extion.set("page", *d);
            }
            Self::ReqwestPageFetching { err, page } => {
                extion.set("page", *page);
                if let Some(url) = err.url() {
                    extion.set("url", url.as_str());
                    if let Some(filename) =
                        Path::new(url.path()).file_name().and_then(|d| d.to_str())
                    {
                        extion.set("filename", filename);
                    }
                }
            }
            Self::IoPage { err, page } => {
                extion.set("page", *page);
                extion.set("io_code", err.kind().to_string());
            }
            _ => {}
        })
    }
}

impl From<crate::Error> for FetchingError {
    fn from(value: crate::Error) -> Self {
        Self::Internal(value.to_string())
    }
}

pub type ChapterPageMessage = Result<ChapterPage, FetchingError>;

type Subs = Arc<RwLock<Vec<UnboundedSender<ChapterPageMessage>>>>;

type Pages = Arc<RwLock<HashMap<u32, ChapterPage>>>;

struct SpawnHandle<R: Runtime> {
    subs: Subs,
    pages: Pages,
    instruction_rx: UnboundedReceiver<Instructions>,
    app_handle: AppHandle<R>,
    chapter_id: Uuid,
    mode: Mode,
    dir: PathBuf,
    at_home_server: Option<AtHomeServer>,
    last_fetched: Option<Instant>,
}

fn get_urls(at_home: &AtHomeServer, mode: Mode) -> Vec<(Url, String)> {
    at_home
        .chapter
        .data
        .iter()
        .flat_map(|file| -> Option<_> {
            Some((
                Url::parse(&format!(
                    "{}{}/{}/{file}",
                    at_home.base_url,
                    match mode {
                        Mode::DataSaver => "data-saver",
                        Mode::Normal => "data",
                    },
                    at_home.chapter.hash
                ))
                .ok()?,
                file.clone(),
            ))
        })
        .collect()
}

impl<R: Runtime> SpawnHandle<R> {
    fn send_message(&self, message: ChapterPageMessage) {
        self.subs.clear_poison();
        if let Ok(read) = self.subs.read() {
            read.iter().for_each(|d| {
                let _ = d.send(message.clone());
            });
        }
    }
    async fn exec(&mut self) {
        while let Some(instruction) = self.instruction_rx.recv().await {
            match instruction {
                Instructions::FetchMetadata => {
                    if let Err(err) = self.check_metadata().await {
                        self.send_message(Err(err));
                    }
                }
                Instructions::StartCaching => {
                    if let Err(err) = self.start_caching().await {
                        self.send_message(Err(err));
                    }
                }
                Instructions::RefetchPage(page) => {
                    if let Err(err) = self.refetch_page(page).await {
                        self.send_message(Err(err));
                    }
                }
            }
        }
    }
    async fn start_caching_offline(&self) -> Result<(), FetchingError> {
        let d = self.app_handle.get_offline_app_state()?;
        let read = d.read().await;
        let state = read
            .as_ref()
            .ok_or(FetchingError::OfflineAppStateNotLoaded)?;
        let at_home = state
            .get_chapter_images(self.chapter_id)
            .await
            .map_err(crate::Error::from)?;
        let data: Vec<(Url, PathBuf)> = at_home
            .data
            .iter()
            .flat_map(|i| {
                let path = Path::new(i);
                let ext = path.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = path.file_name().and_then(|e| e.to_str())?;
                    Some((
                        Url::parse(
                            format!(
                                "{}chapter/{}/data/{i}",
                                crate::constants::PROTOCOL,
                                self.chapter_id,
                            )
                            .as_str(),
                        )
                        .ok()?,
                        path.to_path_buf(),
                    ))
                } else {
                    None
                }
            })
            .collect();
        let data_saver: Vec<(Url, PathBuf)> = at_home
            .data_saver
            .iter()
            .flat_map(|i| {
                let path = Path::new(i);
                let ext = path.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = path.file_name().and_then(|e| e.to_str())?;
                    Some((
                        Url::parse(
                            format!(
                                "{}chapter/{}/data-saver/{i}",
                                crate::constants::PROTOCOL,
                                self.chapter_id
                            )
                            .as_str(),
                        )
                        .ok()?,
                        path.to_path_buf(),
                    ))
                } else {
                    None
                }
            })
            .collect();
        let to_use = match self.mode {
            Mode::Normal => data,
            Mode::DataSaver => data_saver,
        };
        let to_use_len = to_use.len();
        for (index, (url, path)) in to_use.into_iter().enumerate() {
            if path.exists() {
                let page = ChapterPage {
                    index: index as u32,
                    pages: to_use_len as u32,
                    url,
                };
                self.send_message(Ok(page.clone()));
                if let Ok(mut write) = self.pages.write() {
                    write.insert(index as u32, page);
                }
            } else {
                self.send_message(Err(FetchingError::PageLoading(
                    index as u32,
                    Some(format!(
                        "File not found {}",
                        path.to_str().unwrap_or_default()
                    )),
                )));
            }
        }
        Ok(())
    }
    async fn start_caching_online(&mut self) -> Result<(), FetchingError> {
        self.check_metadata().await?;
        let at_home = self
            .at_home_server
            .as_ref()
            .ok_or(FetchingError::ChapterPagesDataNotFound)?;
        let pages = get_urls(at_home, self.mode);
        let pages_len = pages.len();
        let client = self.app_handle.get_mangadex_client()?;
        let client_ref = client.get_http_client();
        let client_inner = client_ref.read().await;

        for (index, (url, file)) in pages.into_iter().enumerate() {
            match client_inner
                .client
                .get(url)
                .send()
                .await
                .and_then(|response| response.error_for_status())
            {
                Ok(response) => match response.bytes().await {
                    Ok(bytes) => {
                        if let Err(err) = File::create(self.dir.join(&file)).map(|d| {
                            let mut writer = BufWriter::new(d);
                            io::copy(&mut bytes.reader(), &mut writer)?;
                            writer.flush()?;
                            Ok::<_, io::Error>(())
                        }) {
                            self.send_message(Err(FetchingError::IoPage {
                                err: Arc::new(err),
                                page: index as u32,
                            }));
                        } else {
                            match Url::parse(&format!(
                                "{}chapter-cache/{}/{}/{}",
                                crate::constants::PROTOCOL,
                                self.chapter_id,
                                match self.mode {
                                    Mode::DataSaver => "data-saver",
                                    Mode::Normal => "data",
                                },
                                file
                            )) {
                                Err(err) => {
                                    self.send_message(Err(FetchingError::ParsePageUrl {
                                        err: Arc::new(err),
                                        page: index as _,
                                    }));
                                }
                                Ok(url) => {
                                    let page = ChapterPage {
                                        index: index as _,
                                        pages: pages_len as _,
                                        url,
                                    };
                                    self.pages.clear_poison();
                                    if let Ok(mut write) = self.pages.write() {
                                        write.insert(index as _, page.clone());
                                    }
                                    self.send_message(Ok(page));
                                }
                            }
                        }
                    }
                    Err(err) => {
                        self.send_message(Err(FetchingError::ReqwestPageFetching {
                            err: Arc::new(err),
                            page: index as u32,
                        }));
                    }
                },
                Err(err) => {
                    self.send_message(Err(FetchingError::ReqwestPageFetching {
                        err: Arc::new(err),
                        page: index as u32,
                    }));
                }
            }
        }
        Ok(())
    }
    async fn start_caching(&mut self) -> Result<(), FetchingError> {
        match self.start_caching_offline().await {
            Err(FetchingError::OfflineAppStateNotLoaded) => self.start_caching_online().await,
            Err(err) => Err(err),
            _ => Ok(()),
        }
    }
    async fn fetch_metadata(&mut self) -> Result<(), FetchingError> {
        self.app_handle.get_specific_rate_limit()?.at_home().await;
        let client = self.app_handle.get_mangadex_client()?;
        let at_home = client
            .at_home()
            .server()
            .id(self.chapter_id)
            .get()
            .send()
            .await
            .map_err(crate::Error::from)?;
        self.at_home_server.replace(at_home.body);
        self.last_fetched.replace(Instant::now());
        Ok(())
    }
    async fn check_metadata(&mut self) -> Result<(), FetchingError> {
        if let Some(last_fetched) = self.last_fetched {
            if last_fetched.elapsed() >= Duration::from_secs(15 * 60) {
                self.fetch_metadata().await?;
            }
        } else {
            self.fetch_metadata().await?;
        }
        Ok(())
    }
    async fn refetch_page(&mut self, page: u32) -> Result<(), FetchingError> {
        self.check_metadata().await?;
        let at_home = self
            .at_home_server
            .as_ref()
            .ok_or(FetchingError::ChapterPagesDataNotFound)?;
        let pages = get_urls(at_home, self.mode);
        let pages_len = pages.len();
        let client = self.app_handle.get_mangadex_client()?;
        let client_ref = client.get_http_client();
        let client_inner = client_ref.read().await;
        let Some((base_url, file)) = pages.get(page as usize) else {
            self.send_message(Err(FetchingError::PageLoading(page, None)));
            return Ok(());
        };
        match client_inner
            .client
            .get(base_url.clone())
            .send()
            .await
            .and_then(|response| response.error_for_status())
        {
            Ok(response) => match response.bytes().await {
                Ok(bytes) => {
                    if let Err(err) = File::create(self.dir.join(file)).map(|d| {
                        let mut writer = BufWriter::new(d);
                        io::copy(&mut bytes.reader(), &mut writer)?;
                        writer.flush()?;
                        Ok::<_, io::Error>(())
                    }) {
                        self.send_message(Err(FetchingError::IoPage {
                            err: Arc::new(err),
                            page,
                        }));
                    } else {
                        match Url::parse(&format!(
                            "{}/chapter-cache/{}/{}/{}",
                            crate::constants::PROTOCOL,
                            self.chapter_id,
                            match self.mode {
                                Mode::DataSaver => "data-saver",
                                Mode::Normal => "data",
                            },
                            file
                        )) {
                            Err(err) => {
                                self.send_message(Err(FetchingError::ParsePageUrl {
                                    err: Arc::new(err),
                                    page,
                                }));
                            }
                            Ok(url) => {
                                let page = ChapterPage {
                                    index: page,
                                    pages: pages_len as _,
                                    url,
                                };
                                self.pages.clear_poison();
                                if let Ok(mut write) = self.pages.write() {
                                    write.insert(page.index, page.clone());
                                }
                                self.send_message(Ok(page));
                            }
                        }
                    }
                }
                Err(err) => {
                    self.send_message(Err(FetchingError::ReqwestPageFetching {
                        err: Arc::new(err),
                        page,
                    }));
                }
            },
            Err(err) => {
                self.send_message(Err(FetchingError::ReqwestPageFetching {
                    err: Arc::new(err),
                    page,
                }));
            }
        }
        Ok(())
    }
}

pub struct ChapterPagesHandle {
    join_handle: JoinHandle<()>,
    subs: Subs,
    _temp_dir: TempDir,
    pages: Pages,
    instruction_sender: UnboundedSender<Instructions>,
}

pub struct ChapterPagesStream {
    rx: UnboundedReceiver<ChapterPageMessage>,
    handle: Arc<ChapterPagesHandle>,
}

impl Deref for ChapterPagesStream {
    type Target = ChapterPagesHandle;
    fn deref(&self) -> &Self::Target {
        self.handle.as_ref()
    }
}

impl Stream for ChapterPagesStream {
    type Item = async_graphql::Result<ChapterPage>;
    fn poll_next(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<Self::Item>> {
        let recv = ready!(self.rx.poll_recv(cx));
        if let Some(d) = recv {
            Poll::Ready(Some(d.map_err(|err| err.extend())))
        } else {
            Poll::Ready(None)
        }
    }
}

impl ChapterPagesHandle {
    pub fn subscribe_with_rx(&self) -> UnboundedReceiver<ChapterPageMessage> {
        let (tx, rx) = unbounded_channel();
        self.subscribe(tx);
        rx
    }
    pub fn subscribe(&self, sender: UnboundedSender<ChapterPageMessage>) {
        self.subs.clear_poison();
        if let Ok(pages) = self.pages.read() {
            pages.values().cloned().for_each(|page| {
                let _ = sender.send(Ok(page));
            });
        }
        if let Ok(mut read) = self.subs.write() {
            read.push(sender);
        }
    }
    fn send_instruction(&self, instruction: Instructions) {
        let _ = self.instruction_sender.send(instruction);
    }
    pub fn start_caching(&self) {
        self.send_instruction(Instructions::StartCaching);
    }
    pub fn fetch_metadata(&self) {
        self.send_instruction(Instructions::FetchMetadata);
    }
    pub fn refetch_page(&self, page: u32) {
        self.send_instruction(Instructions::RefetchPage(page));
    }
    pub fn get_file_path<P: AsRef<Path>>(&self, path: &P) -> PathBuf {
        self._temp_dir.path().join(path)
    }
    pub fn get_file<P: AsRef<Path>>(&self, path: &P) -> std::io::Result<File> {
        File::open(self.get_file_path(path))
    }
    pub fn new<R: Runtime>(id: Uuid, mode: Mode, app: AppHandle<R>) -> io::Result<Self> {
        let subs: Subs = Default::default();
        let pages: Pages = Default::default();
        let (tx, rx) = unbounded_channel();
        let _temp_dir = tempfile::tempdir()?;
        let mut spawn_handle = SpawnHandle {
            subs: subs.clone(),
            pages: pages.clone(),
            instruction_rx: rx,
            app_handle: app,
            chapter_id: id,
            mode,
            dir: _temp_dir.path().to_path_buf(),
            at_home_server: None,
            last_fetched: None,
        };
        Ok(Self {
            join_handle: tokio::spawn(async move {
                spawn_handle.exec().await;
            }),
            subs,
            _temp_dir,
            pages,
            instruction_sender: tx,
        })
    }
    pub fn subscribe_with_stream(self: Arc<Self>) -> ChapterPagesStream {
        let rx = self.subscribe_with_rx();
        ChapterPagesStream { rx, handle: self }
    }
    pub fn pages(&self) -> Vec<ChapterPage> {
        self.pages
            .read()
            .ok()
            .map(|d| d.values().cloned().collect())
            .unwrap_or_default()
    }
}

impl Drop for ChapterPagesHandle {
    fn drop(&mut self) {
        self.join_handle.abort();
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
struct StoreKey {
    id: Uuid,
    mode: Mode,
}

#[derive(Debug, Default)]
pub struct ChapterPagesStore {
    pages: HashMap<StoreKey, Weak<ChapterPagesHandle>>,
}

impl ChapterPagesStore {
    pub fn get_handle<R: Runtime>(
        &mut self,
        id: Uuid,
        mode: Mode,
        app: AppHandle<R>,
    ) -> io::Result<Arc<ChapterPagesHandle>> {
        match self.pages.entry(StoreKey { id, mode }) {
            Entry::Occupied(mut d) => {
                if let Some(e) = d.get().upgrade() {
                    Ok(e)
                } else {
                    let task = Arc::new(ChapterPagesHandle::new(id, mode, app)?);
                    d.insert(Arc::downgrade(&task));
                    Ok(task)
                }
            }
            Entry::Vacant(d) => {
                let task = Arc::new(ChapterPagesHandle::new(id, mode, app)?);
                d.insert(Arc::downgrade(&task));
                Ok(task)
            }
        }
    }
    pub fn get_handle_maybe_not_loaded(
        &self,
        id: Uuid,
        mode: Mode,
    ) -> Option<Arc<ChapterPagesHandle>> {
        self.pages
            .get(&StoreKey { id, mode })
            .and_then(|d| d.upgrade())
    }
}
