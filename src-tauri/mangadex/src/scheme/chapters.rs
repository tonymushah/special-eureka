use std::{io::Read, path::Path};

use bytes::Bytes;
use regex::Regex;
use tauri::{api::http::StatusCode, http::Request, AppHandle, Manager, Runtime};
use uuid::Uuid;

use super::{
    get_offline_app_state, parse_uri, SchemeResponse, SchemeResponseError, SchemeResponseResult,
};

#[derive(Debug, Clone, Copy)]
enum ChapterMode {
    Data,
    DataSaver,
}

fn not_found_chapter_image(chapter_id: Uuid, filename: &str) -> SchemeResponseError {
    SchemeResponseError::NotFound(
        format!("the given chapter `{chapter_id}`/{filename} is not found").into_bytes(),
    )
}

struct ChaptersHandlerOffline<'a, R: Runtime> {
    app_handle: &'a AppHandle<R>,
    chapter_id: Uuid,
    mode: ChapterMode,
    filename: String,
}

impl<'a, R: Runtime> ChaptersHandlerOffline<'a, R> {
    fn handle(&'a self) -> SchemeResponseResult<tauri::http::Response> {
        let offline_app_state = get_offline_app_state(self.app_handle)?;
        let app_state_read = offline_app_state.blocking_read();
        let chapter_util = app_state_read.chapter_utils().with_id(self.chapter_id);
        let body: Bytes = {
            let mut to_res = Vec::<u8>::new();
            match self.mode {
                ChapterMode::Data => {
                    let res = chapter_util.get_data_image(self.filename.clone()).and_then(
                        |mut buf_reader| {
                            buf_reader.read_to_end(&mut to_res)?;
                            Ok(())
                        },
                    );
                    if res.is_err() {
                        return Err(not_found_chapter_image(self.chapter_id, &self.filename));
                    }
                }
                ChapterMode::DataSaver => {
                    let res = chapter_util
                        .get_data_saver_image(self.filename.clone())
                        .and_then(|mut buf_reader| {
                            buf_reader.read_to_end(&mut to_res)?;
                            Ok(())
                        });
                    if res.is_err() {
                        return not_found_chapter_image(self.chapter_id, &self.filename);
                    }
                }
            };
            to_res.into()
        };
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
            .body(body.to_vec())?)
    }
}

fn get_chapters_params(req: &Request) -> SchemeResponseResult<(Uuid, ChapterMode, String)> {
    let regex = Regex::new(
        r"(?x)/(?P<chapter_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<mode>data|data-saver)/(?P<filename>\w*.*)",
    )?;
    let uri = parse_uri(req)?;
    let captures = regex
        .captures(uri.path())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let chapter_id = captures
        .name("chapter_id")
        .and_then(|id| Uuid::parse_str(id.as_str()).ok())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let mode = captures
        .name("mode")
        .and_then(|mode| match mode.as_str() {
            "data" => Some(ChapterMode::Data),
            "data-saver" => Some(ChapterMode::DataSaver),
            _ => None,
        })
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let filename = captures
        .name("filename")
        .map(|match_| match_.as_str().into())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    Ok((chapter_id, mode, filename))
}

pub fn handle_chapters<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request,
) -> SchemeResponseResult<SchemeResponse> {
    let (chapter_id, mode, filename) = get_chapters_params(req)?;
    ChaptersHandlerOffline {
        chapter_id,
        app_handle: app,
        mode,
        filename: filename.clone(),
    }
    .handle()
}
