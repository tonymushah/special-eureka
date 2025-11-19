use std::io::{self, BufReader};

use reqwest::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_LENGTH, CONTENT_TYPE};
use tauri::{
    AppHandle, Runtime,
    http::{Request, StatusCode},
};

use crate::utils::traits_utils::MangadexTauriManagerExt;

use super::{SchemeResponseError, SchemeResponseResult, parse_uri};
use regex::Regex;
use uuid::Uuid;

#[cfg_attr(feature = "hotpath", hotpath::measure)]
fn not_found_upload_image(session_id: Uuid, filename: &str) -> SchemeResponseError {
    SchemeResponseError::NotFound(
        format!("the given internal session `{session_id}`/{filename} is not found").into_bytes(),
    )
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
fn get_upload_session_params(req: &Request<Vec<u8>>) -> SchemeResponseResult<(Uuid, String)> {
    let regex = Regex::new(
        r"(?x)/(?P<session_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<filename>\w*.*)",
    )?;
    let uri = parse_uri(req)?;
    let captures = regex
        .captures(uri.path())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let chapter_id = captures
        .name("session_id")
        .and_then(|id| Uuid::parse_str(id.as_str()).ok())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let filename = captures
        .name("filename")
        .map(|match_| match_.as_str().into())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    Ok((chapter_id, filename))
}

pub fn handle_upload_image_req<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
    let manager = app.upload_manager();
    let (id, filename) = get_upload_session_params(req)?;
    let res = tauri::async_runtime::block_on(async {
        manager
            .get_read_file_from_session(id, filename.clone())
            .await
    });
    // preallocating here
    // to make it more performant?
    let mut body: Vec<u8> = match &res {
        Ok(file) => file
            .metadata()
            .map(|m| {
                let cp: usize = m.len().try_into().unwrap_or(1_024);
                Vec::with_capacity(cp)
            })
            .unwrap_or(Vec::with_capacity(1_024)),
        _ => Vec::with_capacity(1_024),
    };
    match res {
        Ok(file) => {
            let mut buf_read = BufReader::new(file);
            io::copy(&mut buf_read, &mut body)
                .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))?;
        }
        Err(crate::Error::Io(io)) if io.kind() == std::io::ErrorKind::NotFound => {
            return Err(not_found_upload_image(id, &filename));
        }
        Err(err) => {
            return Err(SchemeResponseError::InternalError(Box::new(err)));
        }
    }
    tauri::http::Response::builder()
        .status(StatusCode::OK)
        .header(CONTENT_TYPE, "image/*")
        .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
        .header(CONTENT_LENGTH, format!("{}", body.len()).as_str())
        .body(body)
        .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))
}
