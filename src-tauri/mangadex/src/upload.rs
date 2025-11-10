use std::{collections::BTreeMap, ops::Deref, path::PathBuf, sync::Arc};

use mangadex_api_types_rust::{Language, MangaDexDateTime};
use tauri::{AppHandle, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{Mutex, RwLock},
    task::JoinHandle,
};
use url::Url;
use uuid::Uuid;

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
    manga_id: Uuid,
    groups: Vec<Uuid>,
    temp_dir: TempDir,
    images: Vec<PathBuf>,
    commit_data: Option<InternUploadSessionCommitData>,
}

#[derive(Debug, Default)]
pub enum UploadSessionState {
    #[default]
    Pending,
    Uploading,
    Error(crate::Error),
}

type ArcRwLock<T> = Arc<RwLock<T>>;

#[derive(Debug, Clone)]
struct UploadSessions(ArcRwLock<BTreeMap<Uuid, InternUploadSession>>);

impl Deref for UploadSessions {
    type Target = ArcRwLock<BTreeMap<Uuid, InternUploadSession>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Debug, Clone)]
struct UploadQueue(ArcRwLock<BTreeMap<Uuid, UploadSessionState>>);

impl Deref for UploadQueue {
    type Target = ArcRwLock<BTreeMap<Uuid, UploadSessionState>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

pub struct UploadManager<R>
where
    R: Runtime,
{
    sessions: UploadSessions,
    queue: UploadQueue,
    runner: Arc<Mutex<JoinHandle<()>>>,
    app: AppHandle<R>,
}

impl<R> UploadManager<R>
where
    R: Runtime,
{
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
        }
        Ok(session_id)
    }
    pub async fn send_session_in_queue(&self, session_id: Uuid) -> crate::Result<()> {
        Ok(())
    }
}
