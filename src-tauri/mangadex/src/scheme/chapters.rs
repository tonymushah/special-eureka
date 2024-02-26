use std::{io::Read, path::Path};

use bytes::Bytes;
use regex::Regex;
use reqwest::StatusCode;
use tauri::{http::Request, AppHandle, Manager, Runtime};
use url::Url;
use uuid::Uuid;

use crate::app_state::OfflineAppState;

use super::{bad_request, invalid_url_input, not_found, not_loaded, SchemeResponse};

enum ChapterMode {
    Data,
    DataSaver,
}

fn not_found_chapter_image(chapter_id: Uuid, filename: &str) -> SchemeResponse {
    not_found(format!("the given chapter `{chapter_id}`/{filename} is not found").into_bytes())
}

pub fn handle_chapters<'a, R: Runtime>(app: &'a AppHandle<R>, req: &'a Request) -> SchemeResponse {
    let uri = {
        let p_uri = Url::parse(req.uri());
        if let Ok(i) = p_uri {
            i
        } else {
            return invalid_url_input();
        }
    };
    if let Some(offline_app_state) = app.try_state::<OfflineAppState>() {
        let app_state_read = offline_app_state.blocking_read();
        if let Some(app_state) = app_state_read.as_ref() {
            if let Ok(regex) = Regex::new(
                r"(?x)/(?P<chapter_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<mode>data|data-saver)/(?P<filename>\w*.*)",
            ) {
                if let Some(res) = regex.captures(uri.path()) {
                    if let Some(chapter_id) = res
                        .name("chapter_id")
                        .and_then(|id| Uuid::parse_str(id.as_str()).ok())
                    {
                        let chapter_util = app_state.chapter_utils().with_id(chapter_id);
                        if let Some(mode) = res.name("mode").and_then(|mode| match mode.as_str() {
                            "data" => Some(ChapterMode::Data),
                            "data-saver" => Some(ChapterMode::DataSaver),
                            _ => None,
                        }) {
                            if let Some(filename) = res.name("filename").map(|f| f.as_str()) {
                                let body: Bytes = {
                                    let mut to_res = Vec::<u8>::new();
                                    match mode {
                                        ChapterMode::Data => {
                                            let res = chapter_util
                                                .get_data_image(filename)
                                                .and_then(|mut buf_reader| {
                                                    buf_reader.read_to_end(&mut to_res)?;
                                                    Ok(())
                                                });
                                            if res.is_err() {
                                                return not_found_chapter_image(
                                                    chapter_id, filename,
                                                );
                                            }
                                        }
                                        ChapterMode::DataSaver => {
                                            let res = chapter_util
                                                .get_data_saver_image(filename)
                                                .and_then(|mut buf_reader| {
                                                    buf_reader.read_to_end(&mut to_res)?;
                                                    Ok(())
                                                });
                                            if res.is_err() {
                                                return not_found_chapter_image(
                                                    chapter_id, filename,
                                                );
                                            }
                                        }
                                    };
                                    to_res.into()
                                };
                                tauri::http::ResponseBuilder::new()
                                    .header("access-control-allow-origin", "*")
                                    .status(StatusCode::OK)
                                    // TODO Add jpeg mimetype
                                    .mimetype(
                                        format!(
                                            "image/{}",
                                            Path::new(filename)
                                                .to_path_buf()
                                                .extension()
                                                .and_then(|f| f.to_str())
                                                .unwrap_or("*")
                                        )
                                        .as_str(),
                                    )
                                    .body(body.to_vec())
                            } else {
                                invalid_url_input()
                            }
                        } else {
                            invalid_url_input()
                        }
                    } else {
                        invalid_url_input()
                    }
                } else {
                    invalid_url_input()
                }
            } else {
                bad_request(String::from("Invalid chapters regex pattern").into_bytes())
            }
        } else {
            not_loaded()
        }
    } else {
        not_loaded()
    }
}
