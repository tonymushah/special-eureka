use std::{collections::VecDeque, sync::Arc};

use uuid::Uuid;

use super::ArcRwLock;

#[derive(Debug, thiserror::Error, enum_kinds::EnumKind)]
#[enum_kind(
    ErrorKind,
    derive(PartialOrd, Ord, Hash),
    enum_repr::EnumRepr(type = "u16", implicit = true)
)]
pub enum UploadQueueError {
    #[error("Currently Uploading {} session", .0)]
    CurrentlyUploading(Uuid),
    #[error("{} is already in queue", .0)]
    AlreadyInQueue(Uuid),
    #[error("{} is not in queue", .0)]
    NotInQueue(Uuid),
}

#[derive(Debug, Clone, Default)]
pub struct UploadQueue {
    queue: ArcRwLock<VecDeque<(Uuid, UploadSessionState)>>,
}

#[derive(Debug, Default, Clone)]
pub enum UploadSessionState {
    #[default]
    Pending,
    Uploading,
    Error(Arc<crate::Error>),
}

impl UploadQueue {
    pub async fn push_entry(&self, id: Uuid) -> Result<(), UploadQueueError> {
        let mut write = self.queue.write().await;
        if write.iter().any(|(key, _)| id == *key) {
            Err(UploadQueueError::AlreadyInQueue(id))
        } else {
            write.push_back((id, Default::default()));
            Ok(())
        }
    }
    pub async fn get_state(&self, id: Uuid) -> Option<UploadSessionState> {
        self.queue
            .read()
            .await
            .iter()
            .find(|(key, _)| *key == id)
            .map(|(_, state)| state.clone())
    }
    pub async fn set_state(
        &self,
        id: Uuid,
        state: UploadSessionState,
    ) -> Result<UploadSessionState, UploadQueueError> {
        let mut write = self.queue.write().await;
        Ok(std::mem::replace(
            write
                .iter_mut()
                .find(|(key, _)| *key == id)
                .map(|(_, state)| state)
                .ok_or(UploadQueueError::NotInQueue(id))?,
            state,
        ))
    }
    pub async fn front(&self) -> Option<(Uuid, UploadSessionState)> {
        self.queue.read().await.front().cloned()
    }
    pub async fn pop_front(&self) -> Option<(Uuid, UploadSessionState)> {
        let mut write = self.queue.write().await;
        let front = write.pop_front();
        if front.is_none() {
            write.shrink_to_fit();
        }
        front
    }
    pub async fn get_queue_order(&self) -> Vec<Uuid> {
        self.queue
            .read()
            .await
            .iter()
            .map(|(key, _)| key)
            .copied()
            .collect()
    }
    pub async fn swap(&self, a: Uuid, b: Uuid) -> Result<(), UploadQueueError> {
        let mut write = self.queue.write().await;

        let a_pos = write
            .iter()
            .position(|(key, _)| *key == a)
            .ok_or(UploadQueueError::NotInQueue(a))?;
        if write
            .iter()
            .find(|(key, _)| *key == a)
            .is_some_and(|(_, state)| matches!(state, UploadSessionState::Uploading))
        {
            return Err(UploadQueueError::CurrentlyUploading(a));
        }

        let b_pos = write
            .iter()
            .position(|(key, _)| *key == b)
            .ok_or(UploadQueueError::NotInQueue(b))?;
        if write
            .iter()
            .find(|(key, _)| *key == a)
            .is_some_and(|(_, state)| matches!(state, UploadSessionState::Uploading))
        {
            return Err(UploadQueueError::CurrentlyUploading(b));
        }

        write.swap(a_pos, b_pos);
        Ok(())
    }
}
