use std::sync::Arc;

use async_graphql::{Context, Result, Subscription};
use tauri::{EventHandler, Window, WindowEvent};
use tokio::sync::RwLock;
use tokio::time::{sleep, Duration};
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
    api_client::ApiClientSubscriptions,
    author::AuthorSubscriptions,
    chapter::ChapterSubscriptions,
    cover::CoverSubscriptions,
    custom_list::CustomListSubscriptions,
    manga::MangaSubscriptions,
    rating::RatingSubscriptions,
    statistics::{manga::MangaStatisticsSubscriptions, StatisticsSubscriptions},
    tag::TagSubscriptions,
    upload::{session::UploadSessionSubscriptions, session_file::UploadSessionFileSubscriptions},
    user::{me::UserMeSubscriptions, UserSubscriptions},
};
use crate::{
    objects::{
        api_client::attributes::ApiClientAttributes,
        author::attributes::AuthorAttributes,
        chapter::attributes::ChapterAttributes,
        cover::attributes::CoverAttributes,
        custom_list::attributes::CustomListAttributes,
        manga::attributes::GraphQLMangaAttributes as MangaAttributes,
        rating::RatingItemAttributes,
        statistics::{manga::MangaStatisticsAttributes, StatisticsComments},
        tag::attributes::TagAttributes,
        upload::{
            session::attributes::UploadSessionAttributes,
            session_file::attributes::UploadSessionFileAttributes,
        },
        user::attributes::UserAttributes,
    },
    utils::{get_watches_from_graphql_context, get_window_from_async_graphql, watch::Watches},
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
    pub async fn watch_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        StatisticsSubscriptions.listen_by_id(ctx, id, sub_id).await
    }
    pub async fn watch_manga_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        MangaStatisticsSubscriptions
            .listen_by_id(ctx, manga_id, sub_id)
            .await
    }
    pub async fn watch_tag<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        tag_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = TagAttributes> + 'ctx> {
        TagSubscriptions.listen_by_id(ctx, tag_id, sub_id).await
    }
    pub async fn watch_upload_session<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionAttributes> + 'ctx> {
        UploadSessionSubscriptions
            .listen_by_id(ctx, upload_session_id, sub_id)
            .await
    }
    pub async fn watch_upload_session_file<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_file_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionFileAttributes> + 'ctx> {
        UploadSessionFileSubscriptions
            .listen_by_id(ctx, upload_session_file_id, sub_id)
            .await
    }
    pub async fn watch_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserSubscriptions.listen_by_id(ctx, user_id, sub_id).await
    }
    pub async fn watch_user_me<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserMeSubscriptions.listen(ctx, sub_id).await
    }
}

type InitWatchSubRes<'ctx, R> = Result<(
    tauri::State<'ctx, Watches>,
    Arc<RwLock<bool>>,
    EventHandler,
    &'ctx Window<R>,
)>;

pub fn init_watch_subscription<'ctx, R: tauri::Runtime>(
    ctx: &'ctx Context<'ctx>,
    sub_id: Uuid,
) -> InitWatchSubRes<'ctx, R> {
    let should_end = Arc::new(RwLock::new(false));
    let should_end_un = should_end.clone();
    let should_end_un_n = should_end.clone();
    let watches = get_watches_from_graphql_context::<R>(ctx)?;
    let window = get_window_from_async_graphql::<R>(ctx)?;
    window.on_window_event(move |e| {
        if let WindowEvent::Destroyed = e {
            let mut write = should_end_un_n.blocking_write();
            *write = true;
        }
    });
    let unlisten = window.listen("sub_end", move |e| {
        if let Some(payload) = e.payload() {
            let mut write = should_end_un.blocking_write();
            if let Ok(id) = Uuid::parse_str(payload) {
                *write = id == sub_id;
            }
        }
    });
    Ok((watches, should_end, unlisten, window))
}

pub async fn sub_sleep() {
    sleep(Duration::from_secs(1)).await
}
