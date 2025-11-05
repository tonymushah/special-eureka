use std::str::FromStr;

use crate::error::wrapped::Result;

use async_graphql::{Context, Object};
use mangadex_api_types_rust::Language;
use url::Url;

use self::favicon::get_favicon;

pub mod favicon;

#[derive(Debug, Clone, Copy)]
pub struct UtilsQuery;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl UtilsQuery {
    pub async fn favicon(&self, ctx: &Context<'_>, url: Url) -> Result<Url> {
        Ok(get_favicon::<tauri::Wry>(&url, ctx).await?)
    }
    pub async fn str_to_language(&self, input: String) -> Result<Language> {
        Ok(Language::from_str(&input)?)
    }
    pub async fn language_to_str(&self, language: Language) -> String {
        language.code2().into()
    }
}
