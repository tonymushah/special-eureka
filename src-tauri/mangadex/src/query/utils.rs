use async_graphql::{Context, Object};
use bytes::Bytes;
use url::Url;

use self::favicon::get_favicon;

pub mod favicon;

#[derive(Debug, Clone, Copy)]
pub struct UtilsQuery;

#[Object]
impl UtilsQuery {
    pub async fn favicon(&self, ctx: &Context<'_>, url: Url) -> async_graphql::Result<Bytes> {
        get_favicon::<tauri::Wry>(&url, ctx).await
    }
}
