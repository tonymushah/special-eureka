use async_graphql::Object;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum DownloadState {
    NotDownloaded,
    Downloaded { has_failed: bool },
    Downloading,
}

#[Object]
impl DownloadState {
    pub async fn is_downloaded(&self) -> bool {
        match self {
            DownloadState::Downloaded { .. } => true,
            _ => false,
        }
    }
    pub async fn has_failed(&self) -> bool {
        match self {
            DownloadState::Downloaded { has_failed } => *has_failed,
            _ => false,
        }
    }
}
