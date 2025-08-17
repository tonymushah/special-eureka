use std::{
    io::{self, BufReader},
    path::Path,
};

use regex::Regex;
use tauri::{
    AppHandle, Runtime,
    http::{Request, Response},
};
use uuid::Uuid;

use crate::{
    scheme::{self, SchemeResponseError, SchemeResponseResult, parse_uri},
    store::types::enums::chapter_quality::DownloadMode,
    utils::traits_utils::MangadexTauriManagerExt,
};

fn get_chapters_params(
    req: &Request<Vec<u8>>,
) -> SchemeResponseResult<(Uuid, DownloadMode, String)> {
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
            "data" => Some(DownloadMode::Normal),
            "data-saver" => Some(DownloadMode::DataSaver),
            _ => None,
        })
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    let filename = captures
        .name("filename")
        .map(|match_| match_.as_str().into())
        .ok_or(SchemeResponseError::InvalidURLInput)?;
    Ok((chapter_id, mode, filename))
}

pub fn handle_chapters_cache<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<Response<Vec<u8>>> {
    let (id, mode, filename) = get_chapters_params(req)?;
    let store = app.get_chapter_pages_store();
    if let Ok(read) = store.read() {
        let mut response = Response::<Vec<u8>>::new(Default::default());
        let handle = read
            .get_handle_maybe_not_loaded(id, mode)
            .ok_or(scheme::SchemeResponseError::NotLoaded)?;
        {
            let headers = response.headers_mut();
            headers.insert(
                reqwest::header::CONTENT_TYPE,
                format!(
                    "image/{}",
                    Path::new(&filename)
                        .extension()
                        .and_then(|f| f.to_str())
                        .unwrap_or("*")
                )
                .as_str()
                .try_into()?,
            );
        }
        let file = handle.get_file(&filename)?;
        let mut file = BufReader::new(file);
        io::copy(&mut file, response.body_mut())?;
        {
            let len = format!("{}", response.body().len()).as_str().try_into()?;
            let headers = response.headers_mut();
            headers.insert(reqwest::header::CONTENT_LENGTH, len);
            headers.insert(
                reqwest::header::ACCESS_CONTROL_ALLOW_ORIGIN,
                "*".try_into()?,
            );
        }
        Ok(response)
    } else {
        Err(scheme::SchemeResponseError::NotLoaded)
    }
}
