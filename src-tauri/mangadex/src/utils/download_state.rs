use async_graphql::SimpleObject;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum DownloadState {
    NotDownloaded,
    Downloaded { has_failed: bool },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, SimpleObject)]
pub struct DownloadedStateObject {
    is_downloaded: bool,
    has_failed: bool,
}

impl From<DownloadState> for DownloadedStateObject {
    fn from(value: DownloadState) -> Self {
        match value {
            DownloadState::Downloaded { has_failed } => Self {
                is_downloaded: true,
                has_failed,
            },
            DownloadState::NotDownloaded => Self {
                is_downloaded: false,
                has_failed: false,
            },
        }
    }
}

impl From<DownloadedStateObject> for DownloadState {
    fn from(value: DownloadedStateObject) -> Self {
        if value.is_downloaded {
            Self::Downloaded {
                has_failed: value.has_failed,
            }
        } else {
            Self::NotDownloaded
        }
    }
}
