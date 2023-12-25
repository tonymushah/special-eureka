use async_graphql::{Context, Object, Result};
use mangadex_api_schema_rust::{
    v5::{Results, TagAttributes},
    ApiObject, ApiObjectNoRelationships,
};
use mangadex_api_types_rust::{ResponseType, Tag as TagEnum};

use crate::{
    objects::tag::lists::{TagResults, TagResultsGrouped},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Clone, Copy, Debug, Default)]
pub struct TagQueries;

#[Object]
impl TagQueries {
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<TagResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client.manga().tag().get().send().await?.into())
    }
    #[graphql(skip)]
    pub fn get_offline(&self) -> Result<TagResults> {
        let data: Vec<ApiObject<TagAttributes>> = TagEnum::get_all_tags()
            .into_iter()
            .map(|tag| -> ApiObjectNoRelationships<TagAttributes> { tag.into() })
            .map(|o| o.with_relathionships(None))
            .collect();
        Ok(Results {
            response: ResponseType::Collection,
            result: Default::default(),
            limit: data.len().try_into()?,
            offset: 0,
            total: data.len().try_into()?,
            data,
        }
        .into())
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<TagResults> {
        if let Ok(res) = self.get_online(ctx).await {
            Ok(res)
        } else {
            self.get_offline()
        }
    }
    pub async fn list_grouped(&self, ctx: &Context<'_>) -> Result<TagResultsGrouped> {
        Ok(self.list(ctx).await?.into())
    }
}
