use crate::{
    scheme::{SchemeResponseError, SchemeResponseResult},
    utils::traits_utils::MangadexTauriManagerExt,
};
use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use reqwest::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_LENGTH, CONTENT_TYPE};
use std::{
    io::{self, Write},
    ops::Deref,
    path::Path,
};
use tauri::{AppHandle, Runtime, http::StatusCode};
use uuid::Uuid;

use super::{ChapterMode, not_found_chapter_image};

pub struct ChaptersHandlerOffline<'a, R: Runtime> {
    pub app_handle: &'a AppHandle<R>,
    pub chapter_id: Uuid,
    pub mode: ChapterMode,
    pub filename: String,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl<'a, R: Runtime> ChaptersHandlerOffline<'a, R> {
    fn get_image(&'a self) -> SchemeResponseResult<Vec<u8>> {
        let inner__ = self
            .app_handle
            .get_offline_app_state()?
            .deref()
            .deref()
            .clone();
        let state = crate::utils::block_on(inner__.read_owned());
        let inner_state = state
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(SchemeResponseError::NotLoaded)?;

        let mut buf = Vec::<u8>::new();
        let mut file = {
            let chapter_id = self.chapter_id;
            let filename = self.filename.clone();
            match self.mode {
                ChapterMode::Data => crate::utils::block_on(async move {
                    inner_state.get_chapter_image(chapter_id, filename).await
                })
                .map_err(|_| not_found_chapter_image(self.chapter_id, &self.filename))?,
                ChapterMode::DataSaver => crate::utils::block_on(async move {
                    inner_state
                        .get_chapter_image_data_saver(chapter_id, filename.clone())
                        .await
                })
                .map_err(|_| not_found_chapter_image(self.chapter_id, &self.filename))?,
            }
        };
        io::copy(&mut file, &mut buf)?;
        buf.flush()?;
        Ok(buf)
    }
    pub fn handle(&'a self) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
        let body = self.get_image()?;
        tauri::http::Response::builder()
            .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
            .status(StatusCode::OK)
            // TODO Add jpeg mimetype
            .header(
                CONTENT_TYPE,
                format!(
                    "image/{}",
                    Path::new(&self.filename)
                        .to_path_buf()
                        .extension()
                        .and_then(|f| f.to_str())
                        .unwrap_or("*")
                )
                .as_str(),
            )
            .header(CONTENT_LENGTH, format!("{}", body.len()).as_str())
            .body(body)
            .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))
    }
}
