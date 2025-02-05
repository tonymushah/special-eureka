use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};

use crate::objects::user::attributes::UserAttributes;

use crate::subscription::utils::{OptionFlattenStream, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct UserMeSubscriptions;

#[Subscription]
impl UserMeSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.user_me.subscribe()
            })?
            .option_flatten()
            .map(|data| data.attributes),
        )
    }
}
