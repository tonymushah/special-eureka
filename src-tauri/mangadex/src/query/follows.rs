use std::ops::Deref;

use crate::{utils::math::divide::divide, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::follows::{
    groups::UserFollowedGroupsParams, lists::UserFollowedListParams,
    mangas::UserFollowedMangaParams, users::UserFollowedUserParams,
};
use mangadex_api_schema_rust::v5::{
    CustomListCollection, GroupCollection, MangaCollection, UserCollection,
};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    objects::{
        custom_list::lists::CustomListResults, manga::lists::MangaResults,
        scanlation_group::lists::ScanlationGroupResults, user::lists::UserResults,
        ExtractReferenceExpansionFromContext, GetId,
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{is_following::inner::IsFollowingInnerData, SendData},
    },
};

// [ ] use [`crate::utils::splittable_param`]
#[derive(Debug, Clone, Copy)]
pub struct FollowsQueries;

#[Object]
impl FollowsQueries {
    pub async fn groups(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: UserFollowedGroupsParams,
    ) -> Result<ScanlationGroupResults> {
        let mut param: UserFollowedGroupsParams = params;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes =
            <ScanlationGroupResults as ExtractReferenceExpansionFromContext>::exctract(ctx);

        Ok({
            let params = {
                let div_res = divide(param.limit.unwrap_or(10), MANGADEX_PAGE_LIMIT);
                let mut all = (0..div_res.quot)
                    .map(|d| {
                        let mut param = param.clone();
                        param.offset =
                            Some(param.offset.unwrap_or_default() + d * MANGADEX_PAGE_LIMIT);
                        param.limit = Some(MANGADEX_PAGE_LIMIT);
                        param
                    })
                    .collect::<Vec<_>>();
                all.push({
                    let mut param = param.clone();
                    param.offset =
                        Some(param.offset.unwrap_or_default() + div_res.quot * MANGADEX_PAGE_LIMIT);
                    param.limit = Some(div_res.remainder);
                    param
                });
                all
            };
            let mut results = Vec::<GroupCollection>::new();
            for val in params {
                results.push(val.send(&client).await?);
            }
            let res: ScanlationGroupResults = results
                .into_iter()
                .fold(
                    GroupCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                )
                .into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.is_following.send_data((
                        data.get_id(),
                        IsFollowingInnerData {
                            type_: RelationshipType::ScanlationGroup,
                            data: true,
                        },
                    ));
                    let _ = watches.scanlation_group.send_data(data);
                }
            });
            res
        })
    }
    pub async fn is_following_group(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let is_following = client
            .user()
            .follows()
            .group()
            .id(id)
            .get()
            .send()
            .await?
            .is_following;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::ScanlationGroup,
                data: is_following,
            },
        ));
        Ok(is_following)
    }
    pub async fn users(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] param: UserFollowedUserParams,
    ) -> Result<UserResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        Ok({
            let params = {
                let div_res = divide(param.limit.unwrap_or(10), MANGADEX_PAGE_LIMIT);
                let mut all = (0..div_res.quot)
                    .map(|d| {
                        let mut param = param.clone();
                        param.offset =
                            Some(param.offset.unwrap_or_default() + d * MANGADEX_PAGE_LIMIT);
                        param.limit = Some(MANGADEX_PAGE_LIMIT);
                        param
                    })
                    .collect::<Vec<_>>();
                all.push({
                    let mut param = param.clone();
                    param.offset =
                        Some(param.offset.unwrap_or_default() + div_res.quot * MANGADEX_PAGE_LIMIT);
                    param.limit = Some(div_res.remainder);
                    param
                });
                all
            };
            let mut results = Vec::<UserCollection>::new();
            for val in params {
                results.push(val.send(&client).await?);
            }
            let res: UserResults = results
                .into_iter()
                .fold(
                    UserCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                )
                .into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.is_following.send_data((
                        data.get_id(),
                        IsFollowingInnerData {
                            type_: RelationshipType::User,
                            data: true,
                        },
                    ));
                    let _ = watches.user.send_data(data);
                }
            });
            res
        })
    }
    pub async fn is_following_user(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let is_following = client
            .user()
            .follows()
            .user()
            .id(id)
            .get()
            .send()
            .await?
            .is_following;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::User,
                data: is_following,
            },
        ));
        Ok(is_following)
    }
    pub async fn mangas(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: UserFollowedMangaParams,
    ) -> Result<MangaResults> {
        let mut param: UserFollowedMangaParams = params;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok({
            let params = {
                let div_res = divide(param.limit.unwrap_or(10), MANGADEX_PAGE_LIMIT);
                let mut all = (0..div_res.quot)
                    .map(|d| {
                        let mut param = param.clone();
                        param.offset =
                            Some(param.offset.unwrap_or_default() + d * MANGADEX_PAGE_LIMIT);
                        param.limit = Some(MANGADEX_PAGE_LIMIT);
                        param
                    })
                    .collect::<Vec<_>>();
                all.push({
                    let mut param = param.clone();
                    param.offset =
                        Some(param.offset.unwrap_or_default() + div_res.quot * MANGADEX_PAGE_LIMIT);
                    param.limit = Some(div_res.remainder);
                    param
                });
                all
            };
            let mut results = Vec::<MangaCollection>::new();
            for val in params {
                results.push(val.send(&client).await?);
            }
            let res: MangaResults = results
                .into_iter()
                .fold(
                    MangaCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                )
                .into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.is_following.send_data((
                        data.get_id(),
                        IsFollowingInnerData {
                            type_: RelationshipType::Manga,
                            data: true,
                        },
                    ));
                    let _ = watches.manga.send_online(data);
                }
            });
            res
        })
    }
    pub async fn is_following_manga(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let is_following = client
            .user()
            .follows()
            .manga()
            .id(id)
            .get()
            .send()
            .await?
            .is_following;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::Manga,
                data: is_following,
            },
        ));
        Ok(is_following)
    }
    pub async fn custom_lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] param: UserFollowedListParams,
    ) -> Result<CustomListResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        Ok({
            let params = {
                let div_res = divide(param.limit.unwrap_or(10), MANGADEX_PAGE_LIMIT);
                let mut all = (0..div_res.quot)
                    .map(|d| {
                        let mut param = param.clone();
                        param.offset =
                            Some(param.offset.unwrap_or_default() + d * MANGADEX_PAGE_LIMIT);
                        param.limit = Some(MANGADEX_PAGE_LIMIT);
                        param
                    })
                    .collect::<Vec<_>>();
                all.push({
                    let mut param = param.clone();
                    param.offset =
                        Some(param.offset.unwrap_or_default() + div_res.quot * MANGADEX_PAGE_LIMIT);
                    param.limit = Some(div_res.remainder);
                    param
                });
                all
            };
            let mut results = Vec::<CustomListCollection>::new();
            for val in params {
                results.push(val.send(&client).await?);
            }
            let res: CustomListResults = results
                .into_iter()
                .fold(
                    CustomListCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                )
                .into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.is_following.send_data((
                        data.get_id(),
                        IsFollowingInnerData {
                            data: true,
                            type_: RelationshipType::CustomList,
                        },
                    ));
                    let _ = watches.custom_list.send_data(data);
                }
            });
            res
        })
    }
    pub async fn is_following_custom_list(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let is_following = client
            .user()
            .follows()
            .list()
            .id(id)
            .get()
            .send()
            .await?
            .is_following;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::CustomList,
                data: is_following,
            },
        ));
        Ok(is_following)
    }
}
