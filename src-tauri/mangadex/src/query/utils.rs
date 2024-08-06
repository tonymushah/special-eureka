use std::str::FromStr;

use async_graphql::{Context, Object};
use bytes::Bytes;
use mangadex_api_types_rust::Language;
use url::Url;

use self::favicon::get_favicon;

pub mod favicon;

#[derive(Debug, Clone, Copy)]
pub struct UtilsQuery;

#[Object]
impl UtilsQuery {
    pub async fn favicon(&self, ctx: &Context<'_>, url: Url) -> crate::Result<Url> {
        get_favicon::<tauri::Wry>(&url, ctx).await
    }
    pub async fn str_to_language(&self, input: String) -> crate::Result<Language> {
        Ok(Language::from_str(&input)?)
    }
    pub async fn language_to_str(&self, language: Language) -> String {
        language.code2().into()
    }
}
