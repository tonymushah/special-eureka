use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use mangadex_api_types_rust::RelationshipType;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct IsFollowingSubscriptions;

#[Subscription]
impl IsFollowingSubscriptions {
    pub async fn listen_by_manga_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
         
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry> (ctx,
                |w| w.is_following.subscribe(),
            )?
            .option_filter_by_id(manga_id)
            .filter(|data| data.type_ == RelationshipType::Manga)
            .map(|data| data.data),
        )
    }
    pub async fn listen_by_group_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        group_id: Uuid,
         
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry> (ctx,
                |w| w.is_following.subscribe(),
            )?
            .option_filter_by_id(group_id)
            .filter(|data| data.type_ == RelationshipType::ScanlationGroup)
            .map(|data| data.data),
        )
    }
    pub async fn listen_by_user_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
         
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry> (ctx,
                |w| w.is_following.subscribe(),
            )?
            .option_filter_by_id(user_id)
            .filter(|data| data.type_ == RelationshipType::User)
            .map(|data| data.data),
        )
    }
    pub async fn listen_by_custom_list_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
         
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry> (ctx,
                |w| w.is_following.subscribe(),
            )?
            .option_filter_by_id(custom_list_id)
            .filter(|data| data.type_ == RelationshipType::CustomList)
            .map(|data| data.data),
        )
    }
}
