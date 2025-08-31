use std::ops::Deref;

use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_schema_rust::{
    ApiObject, ApiObjectNoRelationships,
    v5::{Results, TagAttributes},
};
use mangadex_api_types_rust::{ResponseType, Tag as TagEnum};

use crate::{
    objects::tag::lists::{TagResults, TagResultsGrouped},
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Clone, Copy, Debug, Default)]
pub struct TagQueries;

#[Object]
impl TagQueries {
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<TagResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;

        let res: TagResults = client.manga().tag().get().send().await?.into();
        let _res = res.clone();

        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.tag.send_data(data);
            }
        });

        Ok(res)
    }
    #[graphql(skip)]
    pub fn get_offline(&self, ctx: &Context<'_>) -> Result<TagResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();

        let _data: Vec<ApiObject<TagAttributes>> = TagEnum::get_all_tags()
            .into_iter()
            .map(|tag| -> ApiObjectNoRelationships<TagAttributes> { tag.into() })
            .map(|o| o.with_relathionships(None))
            .collect();
        let res: TagResults = Results {
            response: ResponseType::Collection,
            result: Default::default(),
            limit: _data.len().try_into()?,
            offset: 0,
            total: _data.len().try_into()?,
            data: _data,
        }
        .into();

        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.tag.send_data(data);
            }
        });

        Ok(res)
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<TagResults> {
        if let Ok(res) = self.get_online(ctx).await {
            Ok(res)
        } else {
            self.get_offline(ctx)
        }
    }
    pub async fn list_grouped(&self, ctx: &Context<'_>) -> Result<TagResultsGrouped> {
        Ok(self.list(ctx).await?.into())
    }
}
