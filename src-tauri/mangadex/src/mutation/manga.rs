use std::collections::HashMap;

use async_graphql::{Context, EmptyMutation, Error, Object, Result};
use mangadex_api_input_types::manga::{
    create::CreateMangaParam, create_relation::MangaCreateRelationParam, list::MangaListParams,
    submit_draft::SubmitMangaDraftParams, update::UpdateMangaParam,
};
use mangadex_api_schema_rust::{v5::MangaAttributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus};
use uuid::Uuid;

use crate::{
    objects::{
        manga::{related::MangaRelated, MangaObject as Manga},
        ExtractReferenceExpansionFromContext,
    },
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Debug, Clone, Copy)]
pub struct MangaMutations;

#[Object]
impl MangaMutations {
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.manga_download(id).download_manga(olasw).await?;
        Ok(EmptyMutation)
    }
    pub async fn create(&self, ctx: &Context<'_>, params: CreateMangaParam) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into())
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: UpdateMangaParam) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = client.manga().id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.manga_utils().with_id(id).delete().await?;
        Ok(EmptyMutation)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.manga().id(id).follow().post().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.manga().id(id).follow().delete().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn update_reading_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<ReadingStatus>,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client
            .manga()
            .id(id)
            .status()
            .post()
            .status(status)
            .send()
            .await?;
        Ok(EmptyMutation)
    }
    pub async fn submit_draft(
        &self,
        ctx: &Context<'_>,
        params: SubmitMangaDraftParams,
    ) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into())
    }
    pub async fn create_relation(
        &self,
        ctx: &Context<'_>,
        params: MangaCreateRelationParam,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<Vec<MangaRelated>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let related_list: HashMap<Uuid, MangaRelation> = params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(|i| (i.id, i.attributes.relation))
            .collect();
        manga_list_params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        manga_list_params.manga_ids = related_list.keys().copied().collect();
        Ok(manga_list_params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(|i| -> Manga { i.into() })
            .flat_map(|i| -> Option<MangaRelated> {
                Some(MangaRelated {
                    id: i.get_id(),
                    related: *related_list.get(&i.get_id())?,
                    obj: i,
                })
            })
            .collect())
    }
    pub async fn delete_relation(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        target_manga: Uuid,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client
            .manga()
            .manga_id(id)
            .relation()
            .id(target_manga)
            .delete()
            .send()
            .await?;
        Ok(EmptyMutation)
    }
}
