use std::{backtrace::Backtrace, ops::Deref};

use async_graphql::ErrorExtensions;
use uuid::Uuid;

#[derive(Debug, thiserror::Error, enum_kinds::EnumKind)]
#[enum_kind(
    ErrorKind,
    derive(PartialOrd, Ord, Hash),
    enum_repr::EnumRepr(type = "u16", implicit = true)
)]
pub enum Error {
    #[error("Mangadex API SDK Error: {0}")]
    MangadexApi(#[from] mangadex_api_types_rust::error::Error),
    #[error("Tauri Internal Error: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("MangaDex Eureka Manager SDK Error: {0}")]
    MangadexEurekaManager(#[from] eureka_mmanager::Error),
    #[error("MangaDex Eureka Manager SDK Error: {0}")]
    MangadexEurekaManagerOwned(#[from] eureka_mmanager::OwnedError),
    #[error("Tauri Plugin Store Error: {0}")]
    TauriStore(#[from] tauri_plugin_store::Error),
    #[error("I/O Error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Offline AppState is not loaded")]
    OfflineAppStateNotLoaded,
    #[error("Infallible but failed... haha! :D")]
    Infailible(#[from] core::convert::Infallible),
    #[error("Watch Send Data Error")]
    WatchSendDataError(#[from] crate::utils::watch::SendDataError),
    #[error("Chapter Upload Error: {0}")]
    ChapterUpload(#[from] crate::mutation::upload::ChapterUploadError),
    #[error("Failed to convert something into an int :3")]
    TryFromInt(#[from] std::num::TryFromIntError),
    #[error("Empty Relationship Table")]
    EmptyRelationshipTable,
    #[error("Error when fetching the cover image")]
    CoverFetch,
    #[error("Reqwest Error: {0}")]
    Reqwest(#[from] reqwest::Error),
    #[error("Error when parsing url: {0}")]
    ParseUrl(#[from] url::ParseError),
    #[error("Cannot find the statistic of the given ressource")]
    CannotFindStatistics,
    #[error("Favicon Picker error: {0}")]
    Favicon(String),
    #[error("App Cache dir not found")]
    AppCacheDirNotFound,
    #[error("Domain url not found")]
    DomainUrlNotFound,
    #[error("the page should be setted")]
    ChapterReadingSetPage,
    #[error("Website favicon not found")]
    FaviconNotFound,
    #[error(
        "Invalid Response : Expected `MangaReadMarkers::Ungrouped` found `MangaReadMarkers::Grouped`"
    )]
    GotReadMarkersGrouped,
    #[error(
        "Invalid Response : Expected `MangaReadMarkers::Grouped` found `MangaReadMarkers::Ungrouped`"
    )]
    GotReadMarkersUnGrouped,
    #[error("MangaDexClient not found")]
    MangaDexClientNotFound,
    #[error("Watches not found")]
    WatchesNotFound,
    #[error("Cannot extract data from `async_graphql::Context`")]
    CannotAsyncGraphqlContextData,
    #[error("LastTimeTokenWhenFecthed not found")]
    LastTimeTokenWhenFecthedNotFound,
    #[error("You're not logged in")]
    NotLoggedIn,
    #[error("Offline app state is already mounted")]
    OfflineAppStateAlreadyLoaded,
    #[error("Unable to load the MangaDexStore")]
    MangaDexStoreNotFound,
    #[error(transparent)]
    Elapsed(#[from] tokio::time::error::Elapsed),
    #[error(transparent)]
    TokioJoinError(#[from] tokio::task::JoinError),
    #[error(transparent)]
    TryFromCoverImageQuality(#[from] crate::cache::cover::TryFromCoverImageQualityError),
    #[error(transparent)]
    TryFromHandleCoversParamsToCache(
        #[from] crate::scheme::covers::TryFromHandleCoversParamsToCache,
    ),
    #[error("Got an error while joining a thread")]
    StdThreadJoinError,
    #[error("No default theme selected")]
    NoDefaultThemeSelected,
    #[error("This method or function is not implemented yet")]
    Unimplemented,
    #[error("Cannot access at the Tauri App Handle from the GraphQL Context")]
    NoAccessAppHandleGQLCtx,
    #[error("Cannot access at the Tauri Window Handle from the GraphQL Context")]
    NoAccessWindowGQLCtx,
    #[error(transparent)]
    ActixMailbox(#[from] actix::MailboxError),
    #[error("{0}")]
    Unknown(String),
    #[error(transparent)]
    WaitForFinished(#[from] eureka_mmanager::download::state::WaitForFinishedError),
    #[error("the `actix::System` registry is not registred in the Tauri App State")]
    ActixSystemNotRegistered,
    #[error("the `actix::System` Arbiter is dead X(")]
    DeadActixArbiter,
    #[error("No data was received when receiving the result from an Actix arbiter handle task")]
    SpawnDataResultMissingActixArbiter,
    #[error("MangaDex Eureka Manager SDK Error: {0}")]
    EurekaManagerCore(#[from] eureka_mmanager_core::Error),
    #[error(transparent)]
    Notification(#[from] tauri_plugin_notification::Error),
    #[error("Cannot access at the Tauri Webview Handle from the GraphQL Context")]
    NoAccessWebviewGQLCtx,
    #[error("Cannot access at the Subscription Cancel Token from the GraphQL Context")]
    NoAccessSubCancelTokenGQLCtx,
    #[error("Cannot access at the chapter notification queue")]
    NoAccessChapterINSHandle,
    #[error("No default Content Profile selected")]
    NoDefaultContentProfileSelected,
    #[error("End stream")]
    EndStream,
    #[error("Error on converting an OsStr to String or &str")]
    OsStrToString,
    #[error("The specific rate limit is not managed")]
    NotManagedSpecificRateLimit,
    #[error(transparent)]
    IndeterminateOffset(#[from] time::error::IndeterminateOffset),
    #[error(transparent)]
    TokioOneshotRecv(#[from] tokio::sync::oneshot::error::RecvError),
    #[error("Some Mutex or RwLock has been poisoned")]
    SyncPoison,
    #[error(transparent)]
    TokioTryLock(#[from] tokio::sync::TryLockError),
    #[error(transparent)]
    Image(#[from] image::ImageError),
    #[error(transparent)]
    Regex(#[from] regex::Error),
    #[error(transparent)]
    SerdeXml(#[from] serde_xml_rs::Error),
    #[error("Cannot converse some path to an &str")]
    PathToStr,
    #[error(transparent)]
    Csv(#[from] csv::Error),
    #[error("the {} page {} is not loaded (yet)", .chapter, .page)]
    ChapterPageNotLoaded { page: u32, chapter: Uuid },
    #[error("the {} chapter pages data can't be read", .0)]
    CannotReadChapterPagesData(Uuid),
}

impl Error {
    pub fn msg(msg: String) -> Self {
        Self::Unknown(msg)
    }
}

impl From<favicon_picker::error::Error> for Error {
    fn from(value: favicon_picker::error::Error) -> Self {
        Self::Favicon(value.to_string())
    }
}

impl ErrorExtensions for Error {
    fn extend(&self) -> async_graphql::Error {
        async_graphql::Error::new(format!("{self}")).extend_with(|_err, exts| {
            exts.set("code", ErrorKind::from(self).repr());
            exts.set("backtrace", Backtrace::capture().to_string());
            match self {
                Self::Reqwest(err)
                | Self::MangadexApi(mangadex_api_types_rust::error::Error::RequestError(err)) => {
                    if let Some(url) = err.url() {
                        exts.set("url", url.to_string());
                    }
                    if let Some(status) = err.status() {
                        exts.set("status", status.as_str());
                    }
                }
                Self::MangadexApi(mangadex_api_types_rust::error::Error::Api(api)) => {
                    exts.set(
                        "status",
                        api.errors.iter().map(|d| d.status).collect::<Vec<_>>(),
                    );
                    exts.set(
                        "request_id",
                        api.errors
                            .iter()
                            .map(|d| d.id.to_string())
                            .collect::<Vec<_>>(),
                    );
                    exts.set(
                        "details",
                        api.errors
                            .iter()
                            .flat_map(|d| d.detail.clone())
                            .collect::<Vec<_>>(),
                    );
                    exts.set(
                        "titles",
                        api.errors
                            .iter()
                            .flat_map(|d| d.title.clone())
                            .collect::<Vec<_>>(),
                    );
                }
                Self::MangadexApi(mangadex_api_types_rust::error::Error::ServerError(
                    status,
                    detail,
                )) => {
                    exts.set("status", *status);
                    exts.set("detail", detail.clone());
                }
                _ => {}
            }
        })
    }
}

#[derive(Debug, Clone)]
pub struct ErrorWrapper(std::sync::Arc<Error>);

impl<E> From<E> for ErrorWrapper
where
    E: Into<Error>,
{
    fn from(value: E) -> Self {
        Self(std::sync::Arc::new(value.into()))
    }
}

impl AsRef<Error> for ErrorWrapper {
    fn as_ref(&self) -> &Error {
        self.0.deref()
    }
}

impl ErrorWrapper {
    pub fn into_inner(self) -> Option<Error> {
        std::sync::Arc::into_inner(self.0)
    }
}

impl From<ErrorWrapper> for async_graphql::Error {
    fn from(value: ErrorWrapper) -> Self {
        value.0.extend()
    }
}
