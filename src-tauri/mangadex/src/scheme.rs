pub mod chapters;
pub mod covers;

use reqwest::StatusCode;
use tauri::{
    http::MimeType,
    plugin::{Builder, Plugin},
    AppHandle, Runtime,
};
use url::Url;

use self::{chapters::handle_chapters, covers::handle_covers};

pub type SchemeResponse = Result<tauri::http::Response, Box<dyn std::error::Error>>;

type SchemeBadResponse = SchemeResponse;

pub fn bad_request(body: Vec<u8>) -> SchemeBadResponse {
    tauri::http::ResponseBuilder::new()
        .header("access-control-allow-origin", "*")
        .status(StatusCode::BAD_REQUEST)
        .mimetype(MimeType::Txt.to_string().as_str())
        .body(body)
}

pub fn not_found(body: Vec<u8>) -> SchemeBadResponse {
    tauri::http::ResponseBuilder::new()
        .header("access-control-allow-origin", "*")
        .status(StatusCode::NOT_FOUND)
        .mimetype(MimeType::Txt.to_string().as_str())
        .body(body)
}

pub fn not_loaded() -> SchemeBadResponse {
    tauri::http::ResponseBuilder::new()
        .header("access-control-allow-origin", "*")
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .mimetype(MimeType::Txt.to_string().as_str())
        .body(b"Offline App State is not loaded".to_vec())
}

pub fn invalid_url_input() -> SchemeResponse {
    tauri::http::ResponseBuilder::new()
        .status(StatusCode::NOT_ACCEPTABLE)
        .header("access-control-allow-origin", "*")
        .mimetype(MimeType::Txt.to_string().as_str())
        .body(String::from("invalid url input").into_bytes())
}

pub fn register_scheme<R: Runtime>(
    app: &AppHandle<R>,
    config: serde_json::Value,
) -> tauri::plugin::Result<()> {
    Builder::<R, ()>::new("mangadex-graphiql")
        .register_uri_scheme_protocol("mangadex", move |app, req| {
            if let Ok(uri) = Url::parse(req.uri()) {
                if uri.domain() == Some("chapter") {
                    handle_chapters(app, req)
                } else if uri.domain() == Some("covers") {
                    handle_covers(app, req)
                } else {
                    not_found(String::from("The given domain is not defined").into_bytes())
                }
            } else {
                invalid_url_input()
            }
        })
        .build()
        .initialize(app, config)
}
