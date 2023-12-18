use async_graphql::{Context, Object, Result};
use convert_case::{Case, Casing};
use mangadex_api_input_types::chapter::list::ChapterListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::chapter::{lists::ChapterResults, pages::ChapterPages, Chapter},
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Debug, Clone, Copy)]
pub struct ChapterQueries;

#[Object]
impl ChapterQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: ChapterListParams,
    ) -> Result<ChapterResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set()
                .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                    "manga" => {
                        includes.push(ReferenceExpansionResource::Manga);
                    }
                    "scanlation_groups" => {
                        includes.push(ReferenceExpansionResource::ScanlationGroup);
                    }
                    "user" => {
                        includes.push(ReferenceExpansionResource::User);
                    }
                    _ => {}
                });
        }
        includes.dedup();
        Ok(params.send(&client).await?.into())
    }
    #[graphql(skip)]
    async fn get_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel.selection_set()
                .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                    "manga" => {
                        includes.push(ReferenceExpansionResource::Manga);
                    }
                    "scanlation_groups" => {
                        includes.push(ReferenceExpansionResource::ScanlationGroup);
                    }
                    "user" => {
                        includes.push(ReferenceExpansionResource::User);
                    }
                    _ => {}
                });
        }
        includes.dedup();
        Ok(client
            .chapter()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        // TODO Add offline support
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        if let Some(_app_state) = read_off_state.as_ref() {
            todo!()
        } else {
            self.get_online(ctx, id).await
        }
    }
    pub async fn pages(&self, ctx: &Context<'_>, id: Uuid) -> Result<ChapterPages> {
        // TODO Add offline support
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        if let Some(_app_state) = read_off_state.as_ref() {
            todo!()
        } else {
            let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
            Ok(client
                .at_home()
                .server()
                .id(id)
                .get()
                .send()
                .await?
                .body
                .into())
        }
    }
}
