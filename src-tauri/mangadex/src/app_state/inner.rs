use std::{ops::Deref, sync::Arc, time::Duration};

use actix::prelude::*;
use eureka_mmanager::{prelude::PushActorAddr, DirsOptions, DownloadManager};
use mangadex_api_schema_rust::{
    v5::{
        ChapterAttributes, ChapterObject, CoverAttributes, CoverObject, MangaAttributes,
        MangaObject,
    },
    ApiObjectNoRelationships,
};
use tauri::{
    async_runtime::{spawn, JoinHandle},
    Manager, Runtime,
};

use crate::utils::traits_utils::{MangaDexActixArbiterHandleExt, MangadexTauriManagerExt};

#[derive(Debug)]
pub struct AppStateInner {
    pub app_state: Addr<DownloadManager>,
    cover_listen: Arc<JoinHandle<()>>,
    chapter_listen: Arc<JoinHandle<()>>,
    manga_listen: Arc<JoinHandle<()>>,
}

impl Deref for AppStateInner {
    type Target = Addr<DownloadManager>;

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
        let system = app.get_actix_system()?;
        let client = app.get_mangadex_client()?.deref().clone();
        let watches1 = app.get_watches()?.deref().clone();
        let watches2 = watches1.clone();
        let watches3 = watches2.clone();
        println!("starting..,");
        // TODO import dir option from runtime

        let app_state = system
            .arbiter()
            .spawn_fn_with_data(move || {
                println!("loading...");
                let manager =
                    DownloadManager::new(DirsOptions::new_from_data_dir("./data").start(), client)
                        .start();
                println!("Loaded!");
                manager
            })
            .await?;
        println!("Started!");
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
                        let sub_inner = sub.borrow().as_ref().cloned();
                        if let Some(data) = sub_inner {
                            let data: ApiObjectNoRelationships<ChapterAttributes> = data.into();
                            let _ = app_state1
                                .verify_and_push(Into::<ChapterObject>::into(data))
                                .await;
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
                        let sub_inner = sub.borrow().as_ref().cloned();
                        if let Some(data) = sub_inner {
                            let data: ApiObjectNoRelationships<MangaAttributes> = data.into();
                            let _ = app_state2
                                .verify_and_push(Into::<MangaObject>::into(data))
                                .await;
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
                        let sub_inner = sub.borrow().as_ref().cloned();
                        if let Some(data) = sub_inner {
                            let data: ApiObjectNoRelationships<CoverAttributes> = data.into();
                            let _ = app_state3
                                .verify_and_push(Into::<CoverObject>::into(data))
                                .await;
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
