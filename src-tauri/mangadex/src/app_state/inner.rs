use std::{ops::Deref, sync::Arc};

use actix::prelude::*;
use eureka_mmanager::{
    DownloadManager,
    history::service::messages::is_in::IsInMessage,
    prelude::{GetManagerStateData, HistoryEntry, PushActorAddr},
};
use futures_util::TryFutureExt;
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{
        ChapterAttributes, ChapterObject, CoverAttributes, CoverObject, MangaAttributes,
        MangaObject,
    },
};
use mangadex_api_types_rust::RelationshipType;
use tauri::{
    Manager, Runtime,
    async_runtime::{JoinHandle, spawn},
};

use crate::{
    store::{
        TauriManagerMangadexStoreExtractor, types::structs::offline_config::OfflineConfigStore,
    },
    utils::traits_utils::{MangaDexActixArbiterHandleExt, MangadexTauriManagerExt},
};

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
        log::debug!("starting..,");
        // [x] import dir option from runtime
        let dirs = {
            let store = app.extract::<OfflineConfigStore>().await?;
            store.get_dir_options(app)?
        };
        dirs.verify_and_init()?;
        let app_state = system
            .arbiter()
            .spawn_fn_with_data(move || {
                log::debug!("loading...");
                let manager = DownloadManager::new(dirs.start(), client).start();
                log::debug!("Loaded!");
                manager
            })
            .await?;
        log::debug!("Started!");
        let app_state1 = app_state.clone();
        let app_state2 = app_state.clone();
        let app_state3 = app_state.clone();

        //let client1 = client.clone();

        Ok(Self {
            app_state,
            chapter_listen: Arc::new(spawn(async move {
                let mut sub = watches1.chapter.subscribe();
                loop {
                    if sub.changed().await.is_ok() {
                        let sub_inner = sub
                            .borrow()
                            .as_ref()
                            .cloned()
                            .filter(|a| a.attributes.is_online());
                        if let Some(data) = sub_inner {
                            if app_state1
                                .get_dir_options()
                                .and_then(|d| {
                                    d.send(IsInMessage(HistoryEntry::new(
                                        data.id,
                                        RelationshipType::Chapter,
                                    )))
                                })
                                .await
                                .unwrap_or_default()
                            {
                                let data: ApiObjectNoRelationships<ChapterAttributes> = data.into();
                                // let id = data.id;
                                let _ = app_state1
                                    .verify_and_push(Into::<ChapterObject>::into(data))
                                    .await;
                            }
                        }
                    } else {
                        break;
                    }
                }
            })),
            manga_listen: Arc::new(spawn(async move {
                let mut sub = watches2.manga.subscribe();
                loop {
                    if sub.changed().await.is_ok() {
                        let sub_inner = sub
                            .borrow()
                            .as_ref()
                            .cloned()
                            .filter(|a| a.attributes.is_online());

                        if let Some(data) = sub_inner {
                            if app_state2
                                .get_dir_options()
                                .and_then(|d| {
                                    d.send(IsInMessage(HistoryEntry::new(
                                        data.id,
                                        RelationshipType::Manga,
                                    )))
                                })
                                .await
                                .unwrap_or_default()
                            {
                                let data: ApiObjectNoRelationships<MangaAttributes> = data.into();
                                let _ = app_state2
                                    .verify_and_push(Into::<MangaObject>::into(data))
                                    .await;
                            }
                        }
                    } else {
                        break;
                    }
                }
            })),
            cover_listen: Arc::new(spawn(async move {
                let mut sub = watches3.cover.subscribe();
                loop {
                    if sub.changed().await.is_ok() {
                        let sub_inner = sub
                            .borrow()
                            .as_ref()
                            .cloned()
                            .filter(|a| a.attributes.is_online());
                        if let Some(data) = sub_inner {
                            if app_state3
                                .get_dir_options()
                                .and_then(|d| {
                                    d.send(IsInMessage(HistoryEntry::new(
                                        data.id,
                                        RelationshipType::CoverArt,
                                    )))
                                })
                                .await
                                .unwrap_or_default()
                            {
                                let data: ApiObjectNoRelationships<CoverAttributes> = data.into();
                                let _ = app_state3
                                    .verify_and_push(Into::<CoverObject>::into(data))
                                    .await;
                            }
                        }
                    } else {
                        break;
                    }
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
