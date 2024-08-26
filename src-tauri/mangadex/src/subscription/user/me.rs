use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::objects::user::attributes::UserAttributes;

use crate::subscription::utils::{OptionFlattenStream, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct UserMeSubscriptions;

#[Subscription]
impl UserMeSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.user_me.subscribe(),
            )?
            .option_flatten()
            .map(|data| data.attributes),
        )
    }
}
