use crate::{
    scheme::{SchemeResponseError, SchemeResponseResult},
    utils::traits_utils::MangadexTauriManagerExt,
};
use bytes::{BufMut, Bytes, BytesMut};
use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use std::{
    io::{self, Write},
    ops::Deref,
    path::Path,
};
use tauri::{api::http::StatusCode, AppHandle, Runtime};
use uuid::Uuid;

use super::{not_found_chapter_image, ChapterMode};

pub struct ChaptersHandlerOffline<'a, R: Runtime> {
    pub app_handle: &'a AppHandle<R>,
    pub chapter_id: Uuid,
    pub mode: ChapterMode,
    pub filename: String,
}

impl<'a, R: Runtime> ChaptersHandlerOffline<'a, R> {
    fn get_image(&'a self) -> SchemeResponseResult<Bytes> {
        let inner__ = self
            .app_handle
            .get_offline_app_state()?
            .deref()
            .deref()
            .clone();
        let state = crate::utils::block_on(inner__.read_owned());
        let inner_state = state
            .as_ref()
            .ok_or(SchemeResponseError::NotLoaded)?
            .clone();
        let mut buf = BytesMut::new().writer();
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
        Ok(buf.into_inner().freeze())
    }
    pub fn handle(&'a self) -> SchemeResponseResult<tauri::http::Response> {
        let body: Bytes = self.get_image()?;
        tauri::http::ResponseBuilder::new()
            .header("access-control-allow-origin", "*")
            .status(StatusCode::OK)
            // TODO Add jpeg mimetype
            .mimetype(
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
            .body(body.to_vec())
            .map_err(SchemeResponseError::InternalError)
    }
}
