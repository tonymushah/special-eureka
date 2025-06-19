use std::{cmp::Ordering, path::Path};

use async_graphql::{Object, Result};
use mangadex_api_schema_rust::v5::AtHomeServer;
use regex::Regex;
use serde::Serialize;
use url::Url;

#[derive(Debug, Clone, Serialize)]
pub struct ChapterPages {
    pub data: Vec<Url>,
    pub data_saver: Vec<Url>,
}

#[Object]
impl ChapterPages {
    pub async fn data(&self) -> Result<Vec<Url>> {
        let regex = Regex::new(r"\d+")?;
        let mut data = self.data.clone();
        data.sort_by(|a, b| {
            let rs = |a: &Url, b: &Url| -> Option<(u32, u32)> {
                Some((
                    Path::new(a.path())
                        .file_name()
                        .and_then(|p| p.to_str())
                        .and_then(|p| regex.captures(p)?.get(0)?.as_str().parse::<u32>().ok())?,
                    Path::new(b.path())
                        .file_name()
                        .and_then(|p| p.to_str())
                        .and_then(|p| regex.captures(p)?.get(0)?.as_str().parse::<u32>().ok())?,
                ))
            };
            if let Some((a_p, b_p)) = rs(a, b) {
                a_p.cmp(&b_p)
            } else {
                Ordering::Equal
            }
        });
        Ok(data)
    }
    pub async fn data_saver(&self) -> Result<Vec<Url>> {
        let regex = Regex::new(r"\d+")?;
        let mut data = self.data_saver.clone();
        data.sort_by(|a, b| {
            let rs = |a: &Url, b: &Url| -> Option<(u32, u32)> {
                Some((
                    Path::new(a.path())
                        .file_name()
                        .and_then(|p| p.to_str())
                        .and_then(|p| regex.captures(p)?.get(0)?.as_str().parse::<u32>().ok())?,
                    Path::new(b.path())
                        .file_name()
                        .and_then(|p| p.to_str())
                        .and_then(|p| regex.captures(p)?.get(0)?.as_str().parse::<u32>().ok())?,
                ))
            };
            if let Some((a_p, b_p)) = rs(a, b) {
                a_p.cmp(&b_p)
            } else {
                Ordering::Equal
            }
        });
        Ok(data)
    }
}

impl ChapterPages {
    pub fn is_empty(&self) -> bool {
        self.data.is_empty() && self.data_saver.is_empty()
    }
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
                    Url::parse(&format!("{base_url}data/{hash}/{url}"))
                    // base_url.join("data")?.join(&hash)?.join(url)
                })
                .collect(),
            data_saver: value
                .chapter
                .data_saver
                .iter()
                .flat_map(|url| -> Result<Url, url::ParseError> {
                    Url::parse(&format!("{base_url}data-saver/{hash}/{url}"))
                    // base_url.join("data-saver")?.join(&hash)?.join(url)
                })
                .collect(),
        }
    }
}
