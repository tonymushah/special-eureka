use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::AtHomeServer;
use serde::Serialize;
use url::Url;

#[derive(Debug, Clone, SimpleObject, Serialize)]
pub struct ChapterPages {
    pub data: Vec<Url>,
    pub data_saver: Vec<Url>,
}

impl From<AtHomeServer> for ChapterPages {
    fn from(value: AtHomeServer) -> Self {
        let hash = value.chapter.hash;
        let base_url = value.base_url;
        Self {
            data: value
                .chapter
                .data
                .iter()
                .flat_map(|url| -> Result<Url, url::ParseError> {
                    base_url.join("data")?.join(&hash)?.join(&url)
                })
                .collect(),
            data_saver: value
                .chapter
                .data_saver
                .iter()
                .flat_map(|url| -> Result<Url, url::ParseError> {
                    base_url.join("data-saver")?.join(&hash)?.join(&url)
                })
                .collect(),
        }
    }
}
