mod queue;
mod sessions;

use std::sync::Arc;

use queue::UploadQueue;
use sessions::UploadSessions;
use tauri::{AppHandle, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{Mutex, RwLock},
    task::JoinHandle,
};
use uuid::Uuid;

pub use queue::{UploadQueueError, UploadSessionState};
pub use sessions::{InternUploadSession, InternUploadSessionCommitData};

type ArcRwLock<T> = Arc<RwLock<T>>;

pub struct UploadManager<R>
where
    R: Runtime,
{
    sessions: UploadSessions,
    queue: UploadQueue,
    runner: Arc<Mutex<Option<JoinHandle<()>>>>,
    app: AppHandle<R>,
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
        }
        Ok(session_id)
    }
    pub async fn send_session_in_queue(&self, session_id: Uuid) -> crate::Result<()> {
        Ok(())
    }
}
