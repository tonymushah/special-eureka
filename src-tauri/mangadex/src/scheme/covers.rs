use std::{
    io::{self, BufReader, Write},
    ops::Deref,
};

use eureka_mmanager::prelude::CoverDataPullAsyncTrait;
use regex::Regex;
use reqwest::header::CONTENT_TYPE;
use tauri::{
    http::{status::StatusCode, Request},
    AppHandle, Runtime,
};
use uuid::Uuid;

use crate::{cache::cover::CoverImageCache, utils::traits_utils::MangadexTauriManagerExt};

use super::{parse_uri, SchemeResponseError, SchemeResponseResult};

#[derive(Debug, Clone)]
struct HandleCoversParams {
    pub cover_id: Uuid,
    pub filename: String,
    pub manga_id: Option<Uuid>,
    pub quality: Option<u32>,
}

#[derive(Debug, thiserror::Error)]
pub enum TryFromHandleCoversParamsToCache {
    #[error("The manga id is not found")]
    MangaIdNotFound,
    #[error(transparent)]
    Quality(#[from] crate::cache::cover::TryFromCoverImageQualityError),
}

impl TryFrom<HandleCoversParams> for CoverImageCache {
    type Error = TryFromHandleCoversParamsToCache;
    fn try_from(value: HandleCoversParams) -> Result<Self, Self::Error> {
        Ok(Self {
            manga_id: value
                .manga_id
                .ok_or(TryFromHandleCoversParamsToCache::MangaIdNotFound)?,
            cover_id: value.cover_id,
            filename: value.filename,
            mode: value.quality.and_then(|e| (e as u16).try_into().ok()),
        })
    }
}

impl TryFrom<&Request<Vec<u8>>> for HandleCoversParams {
    type Error = SchemeResponseError;
    fn try_from(value: &Request<Vec<u8>>) -> Result<Self, Self::Error> {
        let uri = parse_uri(value)?;
        let regex = Regex::new(
            r"(?x)/(?P<cover_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<filename>\w*.*)",
        )?;
        let captures = regex
            .captures(uri.path())
            .ok_or(SchemeResponseError::InvalidURLInput)?;
        let cover_id = captures
            .name("cover_id")
            .and_then(|id| Uuid::parse_str(id.as_str()).ok())
            .ok_or(SchemeResponseError::InvalidURLInput)?;
        let filename: String = captures
            .name("filename")
            .map(|f| {
                let res = f.as_str();
                if let Some((file_, _)) = res.split_once('?') {
                    file_
                } else {
                    res
                }
            })
            .map(|str| str.into())
            .ok_or(SchemeResponseError::InvalidURLInput)?;
        let manga_id = uri
            .query_pairs()
            .find(|(k, _)| k == "mangaId")
            .map(|(_, v)| v.to_string())
            .and_then(|id| Uuid::parse_str(&id).ok());
        let quality = uri
            .query_pairs()
            .find(|(k, _)| k == "mode")
            .map(|(_, v)| v.to_string())
            .and_then(|m| match m.as_str() {
                "256" => Some(256),
                "512" => Some(512),
                _ => None,
            });
        Ok(Self {
            cover_id,
            filename,
            manga_id,
            quality,
        })
    }
}

struct CoverImagesOfflineHandler<'a, R: Runtime> {
    param: &'a HandleCoversParams,
    app: &'a AppHandle<R>,
}

impl<'a, R: Runtime> CoverImagesOfflineHandler<'a, R> {
    pub fn new(param: &'a HandleCoversParams, app: &'a AppHandle<R>) -> Self {
        Self { param, app }
    }
    fn get_from_cache(&self) -> crate::Result<Vec<u8>> {
        let cache: CoverImageCache = self.param.clone().try_into()?;
        cache.get_from_cache()
    }

    pub fn handle(&self) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
        let mut buf = Vec::<u8>::new();
        if let Ok(cache) = self.get_from_cache() {
            buf = cache;
        } else {
            let inner__ = self.app.get_offline_app_state()?.deref().deref().clone();
            let state = crate::utils::block_on(inner__.read_owned());
            let inner_state = state
                .as_ref()
                .map(|e| e.app_state.clone())
                .ok_or(SchemeResponseError::NotLoaded)?;
            {
                let id = self.param.cover_id;
                io::copy(
                    &mut BufReader::new(crate::utils::block_on(async move {
                        inner_state.get_cover_image(id).await
                    })?),
                    &mut buf,
                )?;
            }
        }

        buf.flush()?;
        tauri::http::Response::builder()
            .header("access-control-allow-origin", "*")
            .status(StatusCode::OK)
            .header(CONTENT_TYPE, "image/*")
            .body(buf)
            .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))
    }
}

pub fn handle_covers<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
    let param: HandleCoversParams = req.try_into()?;
    CoverImagesOfflineHandler::new(&param, app).handle()
}
