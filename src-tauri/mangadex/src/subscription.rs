use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

pub mod api_client;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod manga;
pub mod rating;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;

use self::{
    api_client::ApiClientSubscriptions, author::AuthorSubscriptions, chapter::ChapterSubscriptions,
};
use crate::objects::{
    api_client::attributes::ApiClientAttributes, author::attributes::AuthorAttributes,
    chapter::attributes::ChapterAttributes,
};

#[derive(Debug, Clone, Copy)]
pub struct Subscriptions;

#[Subscription]
impl Subscriptions {
    pub async fn watch_api_client<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        api_client_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ApiClientAttributes> + 'ctx> {
        ApiClientSubscriptions
            .listen_by_id(ctx, api_client_id, sub_id)
            .await
    }
    pub async fn watch_author<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        AuthorSubscriptions
            .listen_by_id(ctx, author_id, sub_id)
            .await
    }
    pub async fn watch_chapter<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        ChapterSubscriptions
            .listen_by_id(ctx, chapter_id, sub_id)
            .await
    }
}
