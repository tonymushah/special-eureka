mod queue;
mod sessions;

use std::sync::Arc;

use queue::UploadQueue;
use serde::{Deserialize, Serialize};
use sessions::UploadSessions;
use tauri::{AppHandle, Emitter, Runtime};
use tempfile::TempDir;
use tokio::{
    sync::{Mutex, RwLock},
    task::JoinHandle,
};
use uuid::Uuid;

pub use queue::{UploadQueueError, UploadQueueErrorKind, UploadSessionState};
pub use sessions::{InternUploadSession, InternUploadSessionCommitData};

type ArcRwLock<T> = Arc<RwLock<T>>;

const UPLOAD_MANAGER_EVENT_KEY: &str = "special-eureka://upload-manager-event";

pub struct UploadManager<R>
where
    R: Runtime,
{
    sessions: UploadSessions,
    queue: UploadQueue,
    runner: Arc<Mutex<Option<JoinHandle<()>>>>,
    app: AppHandle<R>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum UploadManagerEventPayload {
    SessionListUpdate,
    QueueListUpdate,
    SessionUpdate { id: Uuid },
    QueueEntryUpdate { id: Uuid },
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
            self.app.emit(
                UPLOAD_MANAGER_EVENT_KEY,
                UploadManagerEventPayload::SessionListUpdate,
            )?;
        }
        Ok(session_id)
    }
    pub async fn send_session_in_queue(&self, session_id: Uuid) -> crate::Result<()> {
        if !self.sessions.read().await.contains_key(&session_id) {
            return Err(crate::Error::InternalUploadSessionNotFound(session_id));
        }
        self.queue.push_entry(session_id).await?;
        self.app.emit(
            UPLOAD_MANAGER_EVENT_KEY,
            UploadManagerEventPayload::QueueListUpdate,
        )?;
        {
            let mut lock = self.runner.lock().await;
            if lock.as_ref().is_none() || lock.as_ref().is_some_and(|r| r.is_finished()) {
                let sessions = self.sessions.clone();
                let queue = self.queue.clone();
                let app = self.app.clone();
                lock.replace(tokio::spawn(async move {
                    inner_runner(queue, sessions, app).await;
                }));
            }
        }

        Ok(())
    }
}

async fn inner_runner<R>(queue: UploadQueue, sessions: UploadSessions, app: AppHandle<R>)
where
    R: Runtime,
{
}
