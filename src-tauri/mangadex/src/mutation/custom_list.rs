pub mod export;

use crate::error::wrapped::Result;
use crate::{
    store::types::structs::content::ContentFeeder,
    utils::{
        splittable_param::SendSplitted,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::{
    custom_list::{
        add_manga::CustomListAddMangaParam, create::CustomListCreateParam,
        remove_manga::CustomListRemoveMangaParam, update::CustomListUpdateParams,
    },
    manga::list::MangaListParams,
};
use mangadex_api_types_rust::{CustomListVisibility, RelationshipType};
use uuid::Uuid;

use crate::{
    objects::custom_list::CustomList,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context,
        watch::{SendData, is_following::inner::IsFollowingInnerData},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct CustomListMutations;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CustomListMutations {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: CustomListCreateParam,
    ) -> Result<CustomList> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: CustomList = params.send(&client).await?.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.custom_list.send_data(data.clone());
        Ok(data)
    }
    pub async fn update(
        &self,
        ctx: &Context<'_>,
        params: CustomListUpdateParams,
    ) -> Result<CustomList> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: CustomList = params.send(&client).await?.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.custom_list.send_data(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).follow().post().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::CustomList,
                data: true,
            },
        ));
        Ok(true)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).follow().delete().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::CustomList,
                data: false,
            },
        ));
        Ok(true)
    }
    pub async fn add_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListAddMangaParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(true)
    }
    pub async fn remove_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListRemoveMangaParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(true)
    }
    pub async fn add_manga_batch(
        &self,
        ctx: &Context<'_>,
        list_id: Uuid,
        manga_ids: Vec<Uuid>,
    ) -> Result<bool> {
        for manga_id in manga_ids {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            client
                .manga()
                .id(manga_id)
                .list()
                .list_id(list_id)
                .post()
                .send()
                .await?;
        }
        Ok(true)
    }
    pub async fn remove_manga_batch(
        &self,
        ctx: &Context<'_>,
        list_id: Uuid,
        manga_ids: Vec<Uuid>,
    ) -> Result<bool> {
        for manga_id in manga_ids {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            client
                .manga()
                .id(manga_id)
                .list()
                .list_id(list_id)
                .delete()
                .send()
                .await?;
        }
        Ok(true)
    }
    pub async fn export(&self) -> export::CustomListExportMutations {
        export::CustomListExportMutations
    }
    pub async fn fork(
        &self,
        ctx: &Context<'_>,
        to_fork: Uuid,
        name: String,
        visibility: Option<CustomListVisibility>,
        filter_content: Option<bool>,
    ) -> Result<CustomList> {
        let to_fork = {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            client
                .custom_list()
                .id(to_fork)
                .get()
                .with_auth(true)
                .send()
                .await?
        };
        let manga_ids = {
            let ids = to_fork
                .data
                .find_relationships(RelationshipType::Manga)
                .into_iter()
                .map(|r| r.id)
                .collect::<Vec<_>>();
            if filter_content.unwrap_or_default() {
                let app = ctx.get_app_handle::<tauri::Wry>()?;
                let client = app.get_mangadex_client()?;
                app.feed(MangaListParams {
                    manga_ids: ids,
                    ..Default::default()
                })
                .send_splitted_default(&client)
                .await?
                .data
                .into_iter()
                .map(|manga| manga.id)
                .collect()
            } else {
                ids
            }
        };
        let mut create = CustomListCreateParam {
            name,
            visibility,
            version: None,
            manga: {
                let mut m = manga_ids.clone();
                m.reverse();
                m
            },
        };

        let mut skipped = 0;
        loop {
            if size_of_val(&create) >= 8000 {
                skipped += 10;
                create.manga = create.manga.into_iter().skip(skipped).collect();
            } else {
                break;
            }
        }
        let new_custom_list = {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            create.send(&client).await?
        };

        if skipped > 0 {
            self.add_manga_batch(
                ctx,
                new_custom_list.data.id,
                manga_ids.iter().skip(skipped).cloned().collect(),
            )
            .await?;
        }
        {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            Ok(client
                .custom_list()
                .id(new_custom_list.data.id)
                .get()
                .with_auth(true)
                .send()
                .await?
                .data
                .into())
        }
    }
}
