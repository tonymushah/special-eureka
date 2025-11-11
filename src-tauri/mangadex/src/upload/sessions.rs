use std::{collections::BTreeMap, ops::Deref, path::PathBuf};

use mangadex_api_types_rust::{Language, MangaDexDateTime};
use tempfile::TempDir;
use url::Url;
use uuid::Uuid;

use super::ArcRwLock;

#[derive(Clone, Debug)]
pub struct InternUploadSessionCommitData {
    pub volume: Option<String>,
    pub chapter: Option<String>,
    pub title: Option<String>,
    pub translated_language: Language,
    pub external_url: Option<Url>,
    pub publish_at: Option<MangaDexDateTime>,
}

#[derive(Debug)]
pub struct InternUploadSession {
    pub(super) manga_id: Uuid,
    pub(super) groups: Vec<Uuid>,
    pub(super) temp_dir: TempDir,
    pub(super) images: Vec<PathBuf>,
    pub(super) commit_data: Option<InternUploadSessionCommitData>,
}

#[derive(Debug, Clone, Default)]
pub struct UploadSessions(ArcRwLock<BTreeMap<Uuid, InternUploadSession>>);

impl Deref for UploadSessions {
    type Target = ArcRwLock<BTreeMap<Uuid, InternUploadSession>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
