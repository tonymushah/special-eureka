use async_graphql::ErrorExtensions;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Mangadex API SDK Error: {0}")]
    MangadexApi(#[from] mangadex_api_types_rust::error::Error),
    #[error("Tauri Internal Error: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("MangaDex Eureka Manager SDK Error: {0}")]
    MangadexEurekaManager(#[from] mangadex_desktop_api2::Error),
    #[error("Tauri Plugin Store Error: {0}")]
    TauriStore(#[from] tauri_plugin_store::Error),
    #[error("I/O Error: {0}")]
    Io(#[from] std::io::Error),
    #[error("INS Error {0}")]
    INS(#[from] crate::ins_handle::error::Error),
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
    #[error("Invalid Response : Expected `MangaReadMarkers::Ungrouped` found `MangaReadMarkers::Grouped`")]
    GotReadMarkersGrouped,
    #[error("Invalid Response : Expected `MangaReadMarkers::Grouped` found `MangaReadMarkers::Ungrouped`")]
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
}

impl From<favicon_picker::error::Error> for Error {
    fn from(value: favicon_picker::error::Error) -> Self {
        Self::Favicon(value.to_string())
    }
}

impl ErrorExtensions for Error {
    fn extend(&self) -> async_graphql::Error {
        async_graphql::Error::new(format!("{}", self))
    }
}
