pub mod chapters;
pub mod covers;

use reqwest::StatusCode;
use tauri::http::MimeType;

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
