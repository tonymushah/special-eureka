use std::{
    io::{self, BufReader, Write},
    ops::Deref,
};

use actix::Addr;
use eureka_mmanager::{DownloadManager, prelude::CoverDataPullAsyncTrait};
use regex::Regex;
use reqwest::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_LENGTH, CONTENT_TYPE};
use tauri::{
    AppHandle, Runtime,
    http::{Request, status::StatusCode},
};
use uuid::Uuid;

use crate::{
    cache::cover::{CoverImageCache, CoverImageQuality},
    utils::traits_utils::MangadexTauriManagerExt,
};

use super::{SchemeResponseError, SchemeResponseResult, parse_uri};

#[derive(Clone, Debug, Copy)]
enum CoverHandlingId {
    Cover(Uuid),
    Manga(Uuid),
}

impl CoverHandlingId {
    async fn get_as_offline_cover_id(self, app: &Addr<DownloadManager>) -> crate::Result<Uuid> {
        match self {
            CoverHandlingId::Cover(id) => Ok(id),
            CoverHandlingId::Manga(id) => {
                use eureka_mmanager::prelude::MangaDataPullAsyncTrait;
                Ok(app
                    .get_manga(id)
                    .await?
                    .find_first_relationships(mangadex_api_types_rust::RelationshipType::CoverArt)
                    .ok_or(crate::Error::RelatedCoverArtNotFound)?
                    .id)
            }
        }
    }
}

impl From<CoverHandlingId> for Uuid {
    fn from(value: CoverHandlingId) -> Self {
        match value {
            CoverHandlingId::Cover(id) => id,
            CoverHandlingId::Manga(id) => id,
        }
    }
}

#[derive(Debug, Clone)]
struct HandleCoversParams {
    pub id: CoverHandlingId,
    pub quality: Option<u32>,
}

impl TryFrom<&Request<Vec<u8>>> for HandleCoversParams {
    type Error = SchemeResponseError;
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn try_from(value: &Request<Vec<u8>>) -> Result<Self, Self::Error> {
        let uri = parse_uri(value)?;
        let regex = Regex::new(
            r"(?x)/(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
        )?;
        let captures = regex
            .captures(uri.path())
            .ok_or(SchemeResponseError::InvalidURLInput)?;
        let id = captures
            .name("id")
            .and_then(|id| Uuid::parse_str(id.as_str()).ok())
            .ok_or(SchemeResponseError::InvalidURLInput)?;
        let as_manga_id = uri.query_pairs().any(|(k, _)| k == "manga");
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
            id: if as_manga_id {
                CoverHandlingId::Manga(id)
            } else {
                CoverHandlingId::Cover(id)
            },
            quality,
        })
    }
}

struct CoverImagesOfflineHandler<'a, R: Runtime> {
    param: &'a HandleCoversParams,
    app: &'a AppHandle<R>,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl<'a, R: Runtime> CoverImagesOfflineHandler<'a, R> {
    pub fn new(param: &'a HandleCoversParams, app: &'a AppHandle<R>) -> Self {
        Self { param, app }
    }
    fn get_from_cache(&self) -> crate::Result<Vec<u8>> {
        let id = self.param.id;
        let quality: Option<CoverImageQuality> = self
            .param
            .quality
            .and_then(|d| TryInto::<_>::try_into(d).ok());
        let app = self.app.clone();
        crate::utils::block_on(async move {
            let client = app.get_mangadex_client()?;
            match id {
                CoverHandlingId::Cover(cover_id) => {
                    CoverImageCache::get_cover_image_by_cover_id(cover_id, quality, &client).await
                }
                CoverHandlingId::Manga(manga_id) => {
                    CoverImageCache::get_cover_image_by_manga_id(manga_id, quality, &client).await
                }
            }
        })
    }

    pub fn handle(&self) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
        let mut buf = Vec::<u8>::new();
        if let Ok(cache) = self.get_from_cache().inspect_err(|err| log::error!("handling cover cache error {:?}", err)) {
            buf = cache;
        } else {
            let inner__ = self.app.get_offline_app_state()?.deref().deref().clone();
            let state = crate::utils::block_on(inner__.read_owned());
            let inner_state = state
                .as_ref()
                .map(|e| e.app_state.clone())
                .ok_or(SchemeResponseError::NotLoaded)?;
            {
                let id = self.param.id;
                io::copy(
                    &mut BufReader::new(crate::utils::block_on(async move {
                        let id = id.get_as_offline_cover_id(&inner_state).await?;
                        let file = inner_state.get_cover_image(id).await?;
                        Ok::<_, crate::Error>(file)
                    })?),
                    &mut buf,
                )?;
            }
        }
        buf.flush()?;
        buf.shrink_to_fit();
        tauri::http::Response::builder()
            .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
            .status(StatusCode::OK)
            .header(CONTENT_TYPE, "image/*")
            .header(CONTENT_LENGTH, format!("{}", buf.len()))
            .body(buf)
            .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))
    }
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn handle_covers<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
    let param: HandleCoversParams = req.try_into()?;
    CoverImagesOfflineHandler::new(&param, app)
        .handle()
        .inspect_err(|err| log::error!("handling cover error {:?}", err))
}
