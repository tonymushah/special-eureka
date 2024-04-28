use std::io::Read;

use bytes::Bytes;
use mangadex_api::MangaDexClient;
use regex::Regex;
use tauri::{
    http::{status::StatusCode, MimeType, Request},
    AppHandle, Manager, Runtime,
};
use url::Url;
use uuid::Uuid;

use crate::app_state::OfflineAppState;
use mangadex_api::CDN_URL;

use super::{invalid_url_input, not_found, not_loaded, SchemeBadResponse, SchemeResponse};

pub fn not_loaded_client() -> SchemeBadResponse {
    tauri::http::ResponseBuilder::new()
        .header("access-control-allow-origin", "*")
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .mimetype(MimeType::Txt.to_string().as_str())
        .body(b"The MangaDexClient is not loaded".to_vec())
}

pub fn handle_covers<'a, R: Runtime>(app: &'a AppHandle<R>, req: &'a Request) -> SchemeResponse {
    let uri = {
        let p_uri = Url::parse(req.uri());
        if let Ok(i) = p_uri {
            i
        } else {
            return invalid_url_input();
        }
    };
    let _client = app.try_state::<MangaDexClient>();
    if let Some(client) = _client {
        if let Ok(regex) = Regex::new(
            r"(?x)/(?P<cover_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<filename>\w*.*)",
        ) {
            if let Some(res) = regex.captures(uri.path()) {
                if let Some(cover_id) = res
                    .name("cover_id")
                    .and_then(|id| Uuid::parse_str(id.as_str()).ok())
                {
                    if let Some(filename) = res.name("filename").map(|f| {
                        let res = f.as_str();
                        if let Some((file_, _)) = res.split_once('?') {
                            file_
                        } else {
                            res
                        }
                    }) {
                        let body: Option<Bytes> = {
                            let mut to_res = Vec::<u8>::new();
                            if let Some(manga_id) = uri
                                .query_pairs()
                                .find(|(k, _)| k == "mangaId")
                                .map(|(_, v)| v.to_string())
                                .and_then(|id| Uuid::parse_str(&id).ok())
                            {
                                let cli = client.get_http_client().blocking_read().client.clone();
                                let url = {
                                    let filename_ = uri
                                        .query_pairs()
                                        .find(|(k, _)| k == "mode")
                                        .map(|(_, v)| v.to_string())
                                        .and_then(|m| match m.as_str() {
                                            "256" => Some(256),
                                            "512" => Some(512),
                                            _ => None,
                                        })
                                        .map(|quality| format!("{filename}.{quality}.jpg"))
                                        .unwrap_or(filename.to_string());
                                    Url::parse(
                                        format!("{CDN_URL}/covers/{manga_id}/{filename_}").as_str(),
                                    )
                                };

                                if let Ok(res) = tauri::async_runtime::block_on(async move {
                                    let b = cli.get(url?).send().await?.bytes().await?;
                                    Ok::<Bytes, mangadex_api_types_rust::error::Error>(b)
                                }) {
                                    to_res.extend_from_slice(&res);
                                    Some(to_res.into())
                                } else {
                                    None
                                }
                            } else {
                                None
                            }
                        };
                        if let Some(bytes_) = body {
                            if bytes_.is_empty() {
                                not_found(String::from("Response is empty").into_bytes())
                            } else {
                                tauri::http::ResponseBuilder::new()
                                    .header("access-control-allow-origin", "*")
                                    .status(StatusCode::OK)
                                    // TODO Add jpeg mimetype
                                    .mimetype("image/jpeg")
                                    .body(bytes_.to_vec())
                            }
                        } else if let Some(offline_app_state) = app.try_state::<OfflineAppState>() {
                            let app_state_read = offline_app_state.blocking_read();
                            if let Some(app_state) = app_state_read.as_ref() {
                                let mut to_res = Vec::<u8>::new();
                                let _ = app_state
                                    .cover_utils()
                                    .with_id(cover_id)
                                    .get_image_buf_reader()
                                    .and_then(|mut buf_reader| {
                                        buf_reader.read_to_end(&mut to_res)?;
                                        Ok(())
                                    });
                                tauri::http::ResponseBuilder::new()
                                    .header("access-control-allow-origin", "*")
                                    .status(StatusCode::OK)
                                    .mimetype("image/jpeg")
                                    .body(to_res.to_vec())
                            } else {
                                not_loaded()
                            }
                        } else {
                            not_loaded()
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
            invalid_url_input()
        }
    } else {
        not_loaded_client()
    }
}
