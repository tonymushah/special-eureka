pub mod export;

use crate::error::wrapped::Result;
use crate::{
    store::types::structs::content::ContentFeeder,
    utils::{
        download::manga::MangaDownloadExtras,
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
use tauri::{AppHandle, Runtime};
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
        #[graphql(validator(min_items = 1))] manga_ids: Vec<Uuid>,
    ) -> Result<bool> {
        add_manga_batch(ctx.get_app_handle::<tauri::Wry>()?, list_id, manga_ids).await?;
        Ok(true)
    }
    pub async fn remove_manga_batch(
        &self,
        ctx: &Context<'_>,
        list_id: Uuid,
        #[graphql(validator(min_items = 1))] manga_ids: Vec<Uuid>,
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
        let manga_ids = get_titles_from_list_ids(
            ctx.get_app_handle::<tauri::Wry>()?,
            vec![to_fork],
            filter_content.unwrap_or_default(),
        )
        .await?;
        Ok(create_custom_list_from_manga_ids(
            ctx.get_app_handle::<tauri::Wry>()?,
            manga_ids,
            name,
            visibility,
        )
        .await?)
    }
    pub async fn follow_batch(&self, ctx: &Context<'_>, ids: Vec<Uuid>) -> Result<Option<bool>> {
        for id in ids {
            self.follow(ctx, id).await?;
        }
        Ok(None)
    }
    pub async fn unfollow_batch(&self, ctx: &Context<'_>, ids: Vec<Uuid>) -> Result<Option<bool>> {
        for id in ids {
            self.unfollow(ctx, id).await?;
        }
        Ok(None)
    }
    pub async fn assemble_custom_lists_into_one(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] to_assemble: Vec<Uuid>,
        name: String,
        visibility: Option<CustomListVisibility>,
        filter_content: Option<bool>,
    ) -> Result<CustomList> {
        let manga_ids = get_titles_from_list_ids(
            ctx.get_app_handle::<tauri::Wry>()?,
            to_assemble,
            filter_content.unwrap_or_default(),
        )
        .await?;
        Ok(create_custom_list_from_manga_ids(
            ctx.get_app_handle::<tauri::Wry>()?,
            manga_ids,
            name,
            visibility,
        )
        .await?)
    }
    pub async fn download_list_titles(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] to_dowload: Vec<Uuid>,
        extras: Option<MangaDownloadExtras>,
        filter_content: Option<bool>,
    ) -> Result<Option<bool>> {
        use futures_util::{
            future::FutureExt,
            stream::{StreamExt, TryStreamExt},
        };
        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        futures_util::stream::iter(
            get_titles_from_list_ids(
                &tauri_handle,
                to_dowload,
                filter_content.unwrap_or_default(),
            )
            .await?,
        )
        .then(move |title_id| {
            let tauri_handle = tauri_handle.clone();
            tokio::spawn(async move {
                crate::utils::download::manga::download_title_with_extras(
                    &tauri_handle,
                    title_id,
                    extras,
                )
                .await?;
                crate::Result::<_, crate::Error>::Ok(())
            })
            .map(|res| {
                res??;
                crate::Result::<_, crate::Error>::Ok(())
            })
        })
        .try_collect::<()>()
        .await?;
        Ok(None)
    }
}

pub async fn get_titles_from_list_ids<R: Runtime>(
    app: &AppHandle<R>,
    list_ids: Vec<Uuid>,
    filter_content: bool,
) -> crate::Result<Vec<Uuid>> {
    let to_assemble = {
        let mut to_ret = Vec::with_capacity(list_ids.capacity());
        for to_fork in list_ids {
            let client = app.get_mangadex_client_with_auth_refresh().await?;
            let list = client
                .custom_list()
                .id(to_fork)
                .get()
                .with_auth(true)
                .send()
                .await?;
            to_ret.push(list);
        }
        to_ret.shrink_to_fit();
        to_ret
    };
    let manga_ids = {
        let ids = to_assemble
            .iter()
            .flat_map(|to_fork| {
                to_fork
                    .data
                    .find_relationships(RelationshipType::Manga)
                    .into_iter()
                    .map(|r| r.id)
            })
            .collect::<Vec<_>>();
        drop(to_assemble);
        if filter_content {
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
    Ok(manga_ids)
}

pub async fn add_manga_batch<R: Runtime>(
    app: &AppHandle<R>,
    list_id: Uuid,
    manga_ids: Vec<Uuid>,
) -> crate::Result<()> {
    for manga_id in manga_ids {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        client
            .manga()
            .id(manga_id)
            .list()
            .list_id(list_id)
            .post()
            .send()
            .await?;
    }
    Ok(())
}

pub async fn create_custom_list_from_manga_ids<R: Runtime>(
    app: &AppHandle<R>,
    manga_ids: Vec<Uuid>,
    name: String,
    visibility: Option<CustomListVisibility>,
) -> crate::Result<CustomList> {
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
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        create.send(&client).await?
    };

    if skipped > 0 {
        add_manga_batch(
            app,
            new_custom_list.data.id,
            manga_ids.iter().skip(skipped).cloned().collect(),
        )
        .await?;
    }
    {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
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
