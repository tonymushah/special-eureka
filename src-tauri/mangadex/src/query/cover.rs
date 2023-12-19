use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::cover::list::CoverListParam;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::cover::{lists::CoverResults, Cover},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct CoverQueries;

#[Object]
impl CoverQueries {
    #[graphql(skip)]
    pub async fn list_offline(
        &self,
        _ctx: &Context<'_>,
        _params: CoverListParam,
    ) -> Result<CoverResults> {
        todo!()
    }
    #[graphql(skip)]
    pub async fn list_online(
        &self,
        ctx: &Context<'_>,
        mut params: CoverListParam,
    ) -> Result<CoverResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set().for_each(|f| match f.name() {
                "manga" => {
                    includes.push(ReferenceExpansionResource::Manga);
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
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: CoverListParam,
    ) -> Result<CoverResults> {
        if let Ok(online) = self.list_online(ctx, params.clone()).await {
            Ok(online)
        } else {
            self.list_offline(ctx, params).await
        }
    }
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel.selection_set().for_each(|f| match f.name() {
                "manga" => {
                    includes.push(ReferenceExpansionResource::Manga);
                }
                "user" => {
                    includes.push(ReferenceExpansionResource::User);
                }
                _ => {}
            });
        }
        includes.dedup();
        Ok(client
            .cover()
            .cover_id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
    #[graphql(skip)]
    pub async fn get_offline(&self, _ctx: &Context<'_>, _id: Uuid) -> Result<Cover> {
        todo!()
    }

    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        if let Ok(online) = self.get_online(ctx, id).await {
            Ok(online)
        } else {
            self.get_offline(ctx, id).await
        }
    }
}
