pub mod me;

use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::user::attributes::UserAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct UserSubscriptions;

#[Subscription]
impl UserSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.user.subscribe()
            })?
            .option_filter_by_id(user_id),
        )
    }
}
