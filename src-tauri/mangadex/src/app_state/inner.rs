use std::{ops::Deref, sync::Arc, time::Duration};

use mangadex_api_schema_rust::{
    v5::{ChapterAttributes, CoverAttributes, MangaAttributes},
    ApiObjectNoRelationships,
};
use mangadex_desktop_api2::{utils::ExtractData, AppState};
use tauri::{
    async_runtime::{spawn, JoinHandle},
    Manager, Runtime,
};

use crate::utils::traits_utils::MangadexTauriManagerExt;

#[derive(Clone)]
pub struct AppStateInner {
    pub app_state: AppState,
    cover_listen: Arc<JoinHandle<()>>,
    chapter_listen: Arc<JoinHandle<()>>,
    manga_listen: Arc<JoinHandle<()>>,
}

impl Deref for AppStateInner {
    type Target = AppState;

    fn deref(&self) -> &Self::Target {
        &self.app_state
    }
}

impl AppStateInner {
    pub async fn init<R, M>(app: &M) -> crate::Result<Self>
    where
        R: Runtime,
        M: Manager<R> + Sync,
    {
        let client = app.get_mangadex_client()?;
        let watches1 = app.get_watches()?.deref().clone();
        let watches2 = watches1.clone();
        let watches3 = watches2.clone();
        let mut app_state = AppState::init().await?;
        app_state.http_client = client.get_http_client().clone();
        let app_state1 = app_state.clone();
        let app_state2 = app_state.clone();
        let app_state3 = app_state.clone();
        Ok(Self {
            app_state,
            chapter_listen: Arc::new(spawn(async move {
                let sub = watches1.chapter.subscribe();
                loop {
                    if watches1.chapter.is_closed() {
                        break;
                    }
                    if sub.has_changed().unwrap_or(false) {
                        if let Some(data) = sub.borrow().as_ref().cloned() {
                            let data: ApiObjectNoRelationships<ChapterAttributes> = data.into();
                            let _ = ExtractData::update(
                                &app_state1.chapter_utils().with_id(data.id),
                                data.into(),
                            );
                        }
                    }
                    tokio::time::sleep(Duration::from_millis(500)).await;
                }
            })),
            manga_listen: Arc::new(spawn(async move {
                let sub = watches2.manga.subscribe();
                loop {
                    if watches2.manga.is_closed() {
                        break;
                    }
                    if sub.has_changed().unwrap_or(false) {
                        if let Some(data) = sub.borrow().as_ref().cloned() {
                            let data: ApiObjectNoRelationships<MangaAttributes> = data.into();
                            let _ = ExtractData::update(
                                &app_state2.manga_utils().with_id(data.id),
                                data.into(),
                            );
                        }
                    }
                    tokio::time::sleep(Duration::from_millis(500)).await;
                }
            })),
            cover_listen: Arc::new(spawn(async move {
                let sub = watches3.cover.subscribe();
                loop {
                    if watches3.cover.is_closed() {
                        break;
                    }
                    if sub.has_changed().unwrap_or(false) {
                        if let Some(data) = sub.borrow().as_ref().cloned() {
                            let data: ApiObjectNoRelationships<CoverAttributes> = data.into();
                            let _ = ExtractData::update(
                                &app_state3.cover_utils().with_id(data.id),
                                data.into(),
                            );
                        }
                    }
                    tokio::time::sleep(Duration::from_millis(500)).await;
                }
            })),
        })
    }
}

impl Drop for AppStateInner {
    fn drop(&mut self) {
        self.chapter_listen.abort();
        self.cover_listen.abort();
        self.manga_listen.abort();
    }
}
