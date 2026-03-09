use std::{
    collections::HashSet,
    ops::{Deref, DerefMut},
    pin::Pin,
};

use crate::{
    Error, Result,
    objects::GetId,
    store::types::structs::content::ContentFeeder,
    utils::{
        read_marker::has_title_read,
        splittable_param::SendSplitted,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};

use async_graphql::Context;
use eureka_mmanager::prelude::{
    AsyncIntoSorted, IntoParamedFilteredStream, MangaDataPullAsyncTrait,
};
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_schema_rust::v5::{MangaCollection, MangaObject};
use mangadex_api_types_rust::RelationshipType;
use tokio::task::spawn_blocking;
use tokio_stream::Stream;
use uuid::Uuid;

use crate::{
    objects::manga::lists::MangaResults,
    utils::{
        Collection, get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Debug, Clone)]
pub struct MangaListQueries {
    params: MangaListParams,
    only_unread: bool,
    exclude_author_artists_blacklist: bool,
}

impl Deref for MangaListQueries {
    type Target = MangaListParams;
    fn deref(&self) -> &Self::Target {
        &self.params
    }
}

impl DerefMut for MangaListQueries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.params
    }
}

impl From<MangaListParams> for MangaListQueries {
    fn from(params: MangaListParams) -> Self {
        Self {
            params,
            only_unread: false,
            exclude_author_artists_blacklist: false,
        }
    }
}

impl From<MangaListQueries> for MangaListParams {
    fn from(value: MangaListQueries) -> Self {
        value.params
    }
}

impl From<&MangaListQueries> for MangaListParams {
    fn from(value: &MangaListQueries) -> Self {
        value.params.clone()
    }
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl MangaListQueries {
    pub fn exclude_author_artists_blacklist(
        mut self,
        exclude_author_artists_blacklist: bool,
    ) -> Self {
        self.exclude_author_artists_blacklist = exclude_author_artists_blacklist;
        self
    }
    pub fn only_unreads(mut self, only_unreads: bool) -> Self {
        self.only_unread = only_unreads;
        self
    }
    pub fn new_with_exclude_feed<CF: ContentFeeder<MangaListParams>>(
        param: MangaListParams,
        exclude_content_profile: bool,
        feeder: &CF,
    ) -> Self {
        if !exclude_content_profile {
            feeder.feed(param).into()
        } else {
            param.into()
        }
    }
    pub fn new<CF: ContentFeeder<MangaListParams>>(param: MangaListParams, feeder: &CF) -> Self {
        feeder.feed(param).into()
    }
    pub async fn list_offline(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;

        let params = self.deref().clone();
        {
            let res: MangaResults = {
                let res: MangaCollection = Collection::from_async_stream(
                    {
                        let mut stream: Pin<Box<dyn Stream<Item = MangaObject> + Send>> =
                            if params.manga_ids.is_empty() {
                                Box::pin(olasw.get_manga_list().await?)
                            } else {
                                Box::pin(
                                    olasw
                                        .get_manga_list_by_ids(params.manga_ids.clone().into_iter())
                                        .await?,
                                )
                            };
                        stream = if let Some(order) = params.order.clone() {
                            Box::pin(tokio_stream::iter(stream.to_sorted(order).await))
                        } else {
                            stream
                        };
                        stream.to_filtered_into(params.clone())
                    },
                    params
                        .limit
                        .unwrap_or(crate::constants::MANGADEX_PAGE_LIMIT)
                        as usize,
                    params.offset.unwrap_or_default() as usize,
                )
                .await
                .try_into()?;
                res.into()
            };
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.manga.send_offline(data);
                }
            });
            Ok(res)
        }
    }
    // [x] use [`crate::utils::splittable_param`]
    pub async fn list_online(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;

        let res: MangaResults = self
            .params
            .clone()
            .send_splitted_default(&client)
            .await?
            .into();
        Ok({
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.manga.send_online(data);
                }
            });
            res
        })
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        if let Ok(res) = self.list_online(ctx).await {
            Ok(res)
        } else {
            self.list_offline(ctx).await
        }
    }
    // We might have complex filters in the future so yeah??
    /// Inner filter such as :
    /// - [`Self::only_unreads`]
    // TODO implement high-level query
    pub async fn list_with_inner_filter(mut self, ctx: &Context<'_>) -> Result<MangaResults> {
        let mut list = self.list(ctx).await?;
        if self.only_unread || self.exclude_author_artists_blacklist {
            loop {
                if self.only_unread {
                    let read_markers = has_title_read(
                        ctx.get_app_handle::<tauri::Wry>()?,
                        list.iter().map(|t| t.get_id()).collect(),
                    )
                    .await
                    .unwrap_or_default();
                    list.retain(|t| !read_markers.contains(&t.get_id()));
                }
                // NOTE: Idk if this works well or not??
                if self.exclude_author_artists_blacklist {
                    let black_listed: HashSet<Uuid> = {
                        let author_ids = list
                            .iter()
                            .flat_map(|t| match t {
                                crate::objects::manga::MangaObject::WithRel(api_object) => Some(
                                    api_object
                                        .relationships
                                        .iter()
                                        .filter(|t| {
                                            matches!(
                                                t.type_,
                                                RelationshipType::Artist | RelationshipType::Author
                                            )
                                        })
                                        .map(|d| d.id.as_bytes().to_vec()),
                                ),
                                crate::objects::manga::MangaObject::WithoutRel(_) => None,
                            })
                            .flatten()
                            .collect::<Vec<_>>();
                        let app = ctx.get_app_handle::<tauri::Wry>()?.clone();
                        spawn_blocking(move || -> crate::Result<_> {
                            use diesel::prelude::*;
                            use mangadex_blacklist_raw::schema::authors_artists::dsl::*;

                            let mut connection = app.blacklist_database_pool()?.get_connection()?;
                            authors_artists
                                .select(author_id)
                                .filter(author_id.eq_any(author_ids))
                                .load_iter::<Vec<u8>, diesel::connection::DefaultLoadingMode>(
                                    &mut connection,
                                )?
                                .map(|bin| -> crate::Result<_> {
                                    let bin = bin?;
                                    Ok(Uuid::from_slice(&bin)?)
                                })
                                .collect::<Result<_, crate::Error>>()
                        })
                        .await??
                    };
                    list.retain(|t| match t {
                        crate::objects::manga::MangaObject::WithRel(api_object) => {
                            !api_object.relationships.iter().any(|t| {
                                matches!(
                                    t.type_,
                                    RelationshipType::Author | RelationshipType::Artist
                                ) && black_listed.contains(&t.id)
                            })
                        }
                        crate::objects::manga::MangaObject::WithoutRel(_) => false,
                    });
                }
                if list.is_empty() {
                    let next_offset = list.info.offset + list.info.limit;
                    if next_offset > list.info.total {
                        break;
                    } else {
                        self.offset = Some(next_offset);
                        list = self.list(ctx).await?;
                    }
                } else {
                    break;
                }
            }
        }
        Ok(list)
    }
}
