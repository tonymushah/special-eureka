//! I am sure you are asking `what in the f* is this again?`
//!
//! To put it simply, it is trying to solve online chapter pages loading by "caching" the images.
//!
//! _Why making it as a sub?_
//!
//! Well, this is the solution I came up with after a long thinking time.
//!
//! Since the chapters pages can be loaded from any webview,
//! it thought that making it as a sub would be solution to it.
//!
pub mod sort;

use std::{
    collections::{HashMap, hash_map::Entry},
    fs::File,
    io::{self, BufReader, BufWriter, Write},
    ops::Deref,
    path::{Path, PathBuf},
    sync::{Arc, RwLock, Weak},
    task::{Poll, ready},
    time::{Duration, Instant},
};

use async_graphql::ErrorExtensions;
use bytes::{Buf, Bytes};
use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use futures_util::Stream;
use mangadex_api_schema_rust::v5::AtHomeServer;
use reqwest::Client;
use tauri::{AppHandle, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{
        mpsc::{UnboundedReceiver, UnboundedSender, unbounded_channel},
        oneshot,
    },
    task::JoinHandle,
};
use url::Url;
use uuid::Uuid;

use crate::{
    app_state::inner::AppStateInner,
    store::{
        TauriManagerMangadexStoreExtractor,
        types::{
            enums::chapter_quality::DownloadMode as Mode, structs::force_443::ForcePort443Store,
        },
    },
    utils::traits_utils::MangadexTauriManagerExt,
};

/// The sub object
#[derive(Debug, Clone, async_graphql::SimpleObject)]
pub struct ChapterPage {
    /// Page index
    pub index: u32,
    /// total pages that should be sent
    pub pages: u32,
    /// Page url (this one should points to an internal scheme)
    pub url: Url,
    /// This image size (if available)
    pub size: Option<ChapterImageSize>,
}

#[derive(Debug, Clone, async_graphql::SimpleObject)]
pub struct ChapterImageSize {
    pub width: u32,
    pub height: u32,
}

impl ChapterImageSize {
    pub fn from_buffer(buf: &[u8]) -> Option<ChapterImageSize> {
        image::load_from_memory(buf).ok().map(|d| Self {
            width: d.width(),
            height: d.height(),
        })
    }
    pub fn from_path<P: AsRef<Path>>(path: &P) -> Option<ChapterImageSize> {
        image::open(path).ok().map(|d| Self {
            width: d.width(),
            height: d.height(),
        })
    }
    pub fn from_img<I: image::GenericImage>(img: &I) -> Self {
        Self {
            width: img.width(),
            height: img.height(),
        }
    }
}

enum Instructions {
    FetchMetadata,
    StartCaching,
    RefetchPage(u32),
    ResendPage(u32),
    ResendAll,
    RefetchIncompletes,
    ExportPage {
        page: u32,
        export_path: String,
        response_tx: Option<oneshot::Sender<crate::Result<()>>>,
    },
}

/// Any error that could happen during the fetching process
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
    Internal(Arc<crate::Error>),
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
    #[error("Page {0} is not cached")]
    PageNotCached(u32),
}

impl From<reqwest::Error> for FetchingError {
    fn from(value: reqwest::Error) -> Self {
        Self::Reqwest(Arc::new(value))
    }
}

impl From<crate::Error> for FetchingError {
    fn from(value: crate::Error) -> Self {
        Self::Internal(Arc::new(value))
    }
}

impl async_graphql::ErrorExtensions for FetchingError {
    fn extend(&self) -> async_graphql::Error {
        match self {
            FetchingError::Internal(d) => d.extend(),
            _ => async_graphql::Error::new(self.to_string()).extend_with(|_, extion| match self {
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
                Self::PageNotCached(page) => {
                    extion.set("page", *page);
                    extion.set("not-cached", true);
                }
                _ => {}
            }),
        }
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
    match mode {
        Mode::Normal => &at_home.chapter.data,
        Mode::DataSaver => &at_home.chapter.data_saver,
    }
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
                Instructions::ResendPage(page) => {
                    if let Some(s) = self.pages.read().ok().and_then(|d| d.get(&page).cloned()) {
                        self.send_message(Ok(s));
                    } else {
                        self.send_message(Err(FetchingError::PageNotCached(page)));
                    }
                }
                Instructions::ResendAll => {
                    if let Ok(read) = self.pages.read() {
                        for (_, page) in read.iter() {
                            self.send_message(Ok(page.clone()));
                        }
                    }
                }
                Instructions::RefetchIncompletes => {
                    if let Err(err) = self.refetch_incompletes().await {
                        self.send_message(Err(err));
                    }
                }
                Instructions::ExportPage {
                    page,
                    export_path,
                    response_tx,
                } => {
                    let res = self.export_page(page, export_path).await;
                    if let Some(tx) = response_tx {
                        let _ = tx.send(res);
                    }
                }
            }
        }
    }
    async fn export_page(&self, page: u32, export_path: String) -> crate::Result<()> {
        let page_data = {
            let Ok(read) = self.pages.read() else {
                return Err(crate::Error::CannotReadChapterPagesData(self.chapter_id));
            };
            let Some(page_data) = read.get(&page) else {
                return Err(crate::Error::ChapterPageNotLoaded {
                    page,
                    chapter: self.chapter_id,
                });
            };
            page_data.clone()
        };
        let mut file_to_copy = match page_data.url.domain() {
            Some("chapter-cache") => {
                let filename = Path::new(page_data.url.path())
                    .file_name()
                    .and_then(|d| d.to_str().map(String::from))
                    .ok_or(crate::Error::ChapterPageNotLoaded {
                        page,
                        chapter: self.chapter_id,
                    })?;
                File::open(self.dir.join(filename))?
            }
            Some("chapter") => {
                let mode = match page_data
                    .url
                    .path_segments()
                    .and_then(|mut d| d.nth(1))
                    .ok_or(crate::Error::ChapterPageNotLoaded {
                        page,
                        chapter: self.chapter_id,
                    })? {
                    "data" => Mode::Normal,
                    "data-saver" => Mode::DataSaver,
                    _ => {
                        return Err(crate::Error::ChapterPageNotLoaded {
                            page,
                            chapter: self.chapter_id,
                        });
                    }
                };

                let filename = Path::new(page_data.url.path())
                    .file_name()
                    .and_then(|d| d.to_str().map(String::from))
                    .ok_or(crate::Error::ChapterPageNotLoaded {
                        page,
                        chapter: self.chapter_id,
                    })?;

                let offline_state = self.app_handle.get_offline_app_state()?;
                let read = offline_state.read().await;
                let offline_data = read
                    .as_ref()
                    .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
                match mode {
                    Mode::Normal => {
                        offline_data
                            .app_state
                            .get_chapter_image(self.chapter_id, filename)
                            .await?
                    }
                    Mode::DataSaver => {
                        offline_data
                            .app_state
                            .get_chapter_image_data_saver(self.chapter_id, filename)
                            .await?
                    }
                }
            }
            _ => {
                return Err(crate::Error::ChapterPageNotLoaded {
                    page,
                    chapter: self.chapter_id,
                });
            }
        };
        let mut export_file = File::create(export_path)?;
        {
            let mut export_file_buffer = BufWriter::new(&mut export_file);
            let mut file_to_copy_buffer = BufReader::new(&mut file_to_copy);
            io::copy(&mut file_to_copy_buffer, &mut export_file_buffer)?;
            export_file_buffer.flush()?;
        }
        Ok(())
    }
    async fn refetch_incompletes(&mut self) -> Result<(), FetchingError> {
        self.pages.clear_poison();

        let Some(pages_len) = self
            .pages
            .read()
            .ok()
            .and_then(|pages_read| pages_read.values().next().map(|p| p.pages))
        else {
            return self.start_caching().await;
        };
        for page_num in 0..pages_len {
            let maybe_in = if let Ok(page_read) = self.pages.read() {
                Some(page_read.contains_key(&page_num))
            } else {
                None
            };
            if !maybe_in.unwrap_or_default() {
                if let Err(err) = self.refetch_page(page_num).await {
                    self.send_message(Err(err));
                }
            }
        }
        Ok(())
    }
    async fn get_offline_to_use_pages(&self) -> Result<(Vec<(Url, PathBuf)>, Mode), FetchingError> {
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
        let data_saver: Vec<(Url, PathBuf)> = (at_home.data_saver)
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

        if data.is_empty() && data_saver.is_empty() {
            return Err(FetchingError::ChapterPagesDataNotFound);
        }

        let (to_use, to_use_mode) = match self.mode {
            Mode::Normal => {
                if !data.is_empty() {
                    (data, Mode::Normal)
                } else {
                    (data_saver, Mode::DataSaver)
                }
            }
            Mode::DataSaver => {
                if !data_saver.is_empty() {
                    (data_saver, Mode::DataSaver)
                } else {
                    (data, Mode::Normal)
                }
            }
        };
        let to_use = sort::sort_couple(to_use).map_err(crate::Error::from)?;
        Ok((to_use, to_use_mode))
    }
    async fn handle_offline_pages(
        &self,
        state: &AppStateInner,
        index: u32,
        url: Url,
        path: PathBuf,
        to_use_len: u32,
        mode: Mode,
    ) {
        let page = ChapterPage {
            index,
            pages: to_use_len,
            url,
            size: async {
                let mut file = match mode {
                    Mode::DataSaver => state
                        .get_chapter_image_data_saver(self.chapter_id, path.clone())
                        .await
                        .map_err(crate::Error::from)?,
                    Mode::Normal => state
                        .get_chapter_image(self.chapter_id, path.clone())
                        .await
                        .map_err(crate::Error::from)?,
                };
                let mut inner_buf = Vec::<u8>::new();
                io::copy(&mut BufReader::new(&mut file), &mut inner_buf)?;
                image::ImageFormat::from_path(&path)
                    .and_then(|format| image::load_from_memory_with_format(&inner_buf, format))
                    .map(|img| ChapterImageSize::from_img(&img))
                    .map_err(crate::Error::from)
            }
            .await
            .inspect_err(|d| {
                log::error!("{d}");
            })
            .ok(),
        };
        self.send_message(Ok(page.clone()));
        if let Ok(mut write) = self.pages.write() {
            write.insert(index, page);
        }
    }
    async fn start_caching_offline(&self) -> Result<(), FetchingError> {
        let (to_use, mode) = self.get_offline_to_use_pages().await?;
        let to_use_len = to_use.len();

        let d = self.app_handle.get_offline_app_state()?;
        let read = d.read().await;
        let state = read
            .as_ref()
            .ok_or(FetchingError::OfflineAppStateNotLoaded)?;

        for (index, (url, path)) in to_use.into_iter().enumerate() {
            self.handle_offline_pages(state, index as u32, url, path, to_use_len as u32, mode)
                .await;
        }
        Ok(())
    }
    async fn get_bytes(&self, client: &Client, url: &Url, index: u32) -> Option<Bytes> {
        match client
            .get(url.clone())
            .send()
            .await
            .and_then(|response| response.error_for_status())
        {
            Ok(response) => match response.bytes().await {
                Ok(b) => Some(b),
                Err(err) => {
                    self.send_message(Err(FetchingError::ReqwestPageFetching {
                        err: Arc::new(err),
                        page: index,
                    }));
                    None
                }
            },
            Err(err) => {
                self.send_message(Err(FetchingError::ReqwestPageFetching {
                    err: Arc::new(err),
                    page: index,
                }));
                None
            }
        }
    }
    async fn handle_bytes(&self, bytes: Bytes, file: &String, index: u32, pages_len: usize) {
        let res = File::create(self.dir.join(file)).and_then(|d| {
            let mut writer = BufWriter::new(d);
            io::copy(&mut bytes.reader(), &mut writer)?;
            writer.flush()?;
            Ok::<_, io::Error>(self.dir.join(file))
        });
        match res {
            Ok(path) => {
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
                            size: ChapterImageSize::from_path(&path),
                        };
                        self.pages.clear_poison();
                        if let Ok(mut write) = self.pages.write() {
                            write.insert(index as _, page.clone());
                        }
                        self.send_message(Ok(page));
                    }
                }
            }
            Err(err) => {
                self.send_message(Err(FetchingError::IoPage {
                    err: Arc::new(err),
                    page: index,
                }));
            }
        }
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
            if let Some(bytes) = self.get_bytes(&client_inner.client, &url, index as _).await {
                self.handle_bytes(bytes, &file, index as _, pages_len).await;
            }
        }
        Ok(())
    }
    async fn start_caching(&mut self) -> Result<(), FetchingError> {
        match self.start_caching_offline().await {
            Err(FetchingError::OfflineAppStateNotLoaded)
            | Err(FetchingError::ChapterPagesDataNotFound) => self.start_caching_online().await,
            Err(err) => Err(err),
            _ => Ok(()),
        }
    }
    async fn fetch_metadata(&mut self) -> Result<(), FetchingError> {
        self.app_handle
            .get_specific_rate_limit()?
            .at_home(&self.chapter_id)
            .await;
        let client = self.app_handle.get_mangadex_client()?;
        let at_home = client
            .at_home()
            .server()
            .id(self.chapter_id)
            .get()
            .force_port_443(
                *self
                    .app_handle
                    .extract::<ForcePort443Store>()
                    .await
                    .unwrap_or_default(),
            )
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
    async fn refetch_page_offline(&self, page: u32) -> Result<(), FetchingError> {
        log::debug!("refetch offline");
        let (to_use, mode) = self.get_offline_to_use_pages().await?;
        let to_use_len = to_use.len();

        let d = self.app_handle.get_offline_app_state()?;
        let read = d.read().await;
        let state = read
            .as_ref()
            .ok_or(FetchingError::OfflineAppStateNotLoaded)?;
        if let Some((page, (url, path))) = to_use.into_iter().enumerate().nth(page as usize) {
            self.handle_offline_pages(state, page as u32, url, path, to_use_len as _, mode)
                .await;
        }
        Ok(())
    }
    async fn refetch_page_online(&mut self, page: u32) -> Result<(), FetchingError> {
        log::debug!("refetch online");
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
        if let Some(bytes) = self.get_bytes(&client_inner.client, base_url, page).await {
            self.handle_bytes(bytes, file, page, pages_len).await;
        }
        Ok(())
    }
    async fn refetch_page(&mut self, page: u32) -> Result<(), FetchingError> {
        match self.refetch_page_offline(page).await {
            Err(FetchingError::OfflineAppStateNotLoaded)
            | Err(FetchingError::ChapterPagesDataNotFound) => self.refetch_page_online(page).await,
            Err(err) => Err(err),
            Ok(_) => Ok(()),
        }
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
    pub fn refetch_incompletes(&self) {
        self.send_instruction(Instructions::RefetchIncompletes);
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
    pub fn resend_page(&self, page: u32) {
        self.send_instruction(Instructions::ResendPage(page));
    }
    pub fn resend_all(&self) {
        self.send_instruction(Instructions::ResendAll);
    }
    pub async fn export_page(&self, page: u32, export_path: String) -> crate::Result<()> {
        let (tx, rx) = oneshot::channel();
        self.send_instruction(Instructions::ExportPage {
            page,
            export_path,
            response_tx: Some(tx),
        });
        rx.await?
    }
    pub fn export_page_defer(&self, page: u32, export_path: String) {
        self.send_instruction(Instructions::ExportPage {
            page,
            export_path,
            response_tx: None,
        });
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
