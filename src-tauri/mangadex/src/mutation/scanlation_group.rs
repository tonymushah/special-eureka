use crate::{
    Result,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::scanlation_group::{
    create::CreateScalantionGroupParam, edit::EditScanlationGroupParam,
};
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::ScanlationGroupAttributes};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::{
    objects::scanlation_group::ScanlationGroup,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context,
        watch::{SendData, is_following::inner::IsFollowingInnerData},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupMutation;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ScanlationGroupMutation {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: CreateScalantionGroupParam,
    ) -> Result<ScanlationGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_group()
            .await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<ScanlationGroupAttributes> = res.body.data.into();
        let _ = watches.scanlation_group.send_data({
            let data: ScanlationGroup = res.clone().into();
            data
        });
        Ok(res.into())
    }
    pub async fn edit(
        &self,
        ctx: &Context<'_>,
        params: EditScanlationGroupParam,
    ) -> Result<ScanlationGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .put_group()
            .await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<ScanlationGroupAttributes> = res.body.data.into();
        let _ = watches.scanlation_group.send_data({
            let data: ScanlationGroup = res.clone().into();
            data
        });
        Ok(res.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_group()
            .await;
        let _res = client.scanlation_group().id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .scanlation_group()
            .id(id)
            .follow()
            .post()
            .send()
            .await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::ScanlationGroup,
                data: true,
            },
        ));
        Ok(true)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .scanlation_group()
            .id(id)
            .follow()
            .delete()
            .send()
            .await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::ScanlationGroup,
                data: false,
            },
        ));
        Ok(true)
    }
}
