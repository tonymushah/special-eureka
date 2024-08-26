use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::objects::api_client::attributes::ApiClientAttributes;

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct ApiClientSubscriptions;

#[Subscription]
impl ApiClientSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        api_client_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ApiClientAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.api_client.subscribe(),
            )?
            .filter_map(move |data| data.filter(|i| i.id == api_client_id).map(|i| i.attributes)),
        )
    }
}
