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
    cover::CoverSubscriptions, custom_list::CustomListSubscriptions, manga::MangaSubscriptions,
    rating::RatingSubscriptions,
};
use crate::objects::{
    api_client::attributes::ApiClientAttributes, author::attributes::AuthorAttributes,
    chapter::attributes::ChapterAttributes, cover::attributes::CoverAttributes,
    custom_list::attributes::CustomListAttributes,
    manga::attributes::GraphQLMangaAttributes as MangaAttributes, rating::RatingItemAttributes,
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
    pub async fn watch_cover<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        CoverSubscriptions.listen_by_id(ctx, cover_id, sub_id).await
    }
    pub async fn watch_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CustomListAttributes> + 'ctx> {
        CustomListSubscriptions
            .listen_by_id(ctx, custom_list_id, sub_id)
            .await
    }
    pub async fn watch_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaAttributes> + 'ctx> {
        MangaSubscriptions.listen_by_id(ctx, manga_id, sub_id).await
    }
    pub async fn watch_rating<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        RatingSubscriptions
            .listen_by_id(ctx, manga_id, sub_id)
            .await
    }
}
