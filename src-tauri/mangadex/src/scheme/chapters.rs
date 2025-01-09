mod offline;

use super::{parse_uri, SchemeResponseError, SchemeResponseResult};
use offline::ChaptersHandlerOffline;
use regex::Regex;

use tauri::{http::Request, AppHandle, Runtime};
use uuid::Uuid;

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

fn get_chapters_params(
    req: &Request<Vec<u8>>,
) -> SchemeResponseResult<(Uuid, ChapterMode, String)> {
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
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
    let (chapter_id, mode, filename) = get_chapters_params(req)?;
    ChaptersHandlerOffline {
        chapter_id,
        app_handle: app,
        mode,
        filename: filename.clone(),
    }
    .handle()
}
