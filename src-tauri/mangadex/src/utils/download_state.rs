use async_graphql::Object;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum DownloadState {
    NotDownloaded,
    Downloaded { has_failed: bool },
}

#[Object]
impl DownloadState {
    pub async fn is_downloaded(&self) -> bool {
        match self {
            DownloadState::NotDownloaded => false,
            DownloadState::Downloaded { .. } => true,
        }
    }
    pub async fn has_failed(&self) -> bool {
        match self {
            DownloadState::NotDownloaded => false,
            DownloadState::Downloaded { has_failed } => *has_failed,
        }
    }
}
