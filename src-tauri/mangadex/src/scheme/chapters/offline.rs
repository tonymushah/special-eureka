use crate::scheme::{get_offline_app_state, SchemeResponseError, SchemeResponseResult};
use bytes::{BufMut, Bytes, BytesMut};
use mangadex_desktop_api2::utils::chapter::ChapterUtilsWithID;
use std::{
    io::{self, Write},
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
    fn chapter_util(&'a self) -> SchemeResponseResult<ChapterUtilsWithID> {
        let offline_app_state = get_offline_app_state(self.app_handle)?;
        let app_state_read = offline_app_state.blocking_read();
        let app_state = app_state_read
            .as_ref()
            .ok_or(SchemeResponseError::NotLoaded)?;
        let chapter_util = app_state.chapter_utils().with_id(self.chapter_id);
        Ok(chapter_util)
    }
    fn get_image(&'a self) -> SchemeResponseResult<Bytes> {
        let chapter_util = self.chapter_util()?;
        let mut buf = BytesMut::new().writer();
        let mut file = match self.mode {
            ChapterMode::Data => chapter_util
                .get_data_image(self.filename.clone())
                .map_err(|_| not_found_chapter_image(self.chapter_id, &self.filename))?,
            ChapterMode::DataSaver => chapter_util
                .get_data_saver_image(self.filename.clone())
                .map_err(|_| not_found_chapter_image(self.chapter_id, &self.filename))?,
        };
        io::copy(&mut file, &mut buf)?;
        buf.flush()?;
        Ok(buf.into_inner().freeze())
    }
    pub fn handle(&'a self) -> SchemeResponseResult<tauri::http::Response> {
        let body: Bytes = self.get_image()?;
        Ok(tauri::http::ResponseBuilder::new()
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
            .map_err(|e| SchemeResponseError::InternalError(e))?)
    }
}
