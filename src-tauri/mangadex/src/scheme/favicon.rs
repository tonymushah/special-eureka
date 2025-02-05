use reqwest::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_TYPE};
use tauri::{http::Request, http::StatusCode, AppHandle, Runtime};
use url::Url;

use super::{SchemeResponseError, SchemeResponseResult};

use crate::cache::favicon::get_favicon_from_cache;

pub struct HandleFaviconParams {
    pub domain: String,
}

impl TryFrom<&Request<Vec<u8>>> for HandleFaviconParams {
    type Error = SchemeResponseError;
    fn try_from(value: &Request<Vec<u8>>) -> Result<Self, Self::Error> {
        let uri = Url::parse(value.uri().to_string().as_str())?;
        let domain = uri.path();
        Ok(Self {
            domain: String::from(domain),
        })
    }
}

pub fn handle_favicon<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request<Vec<u8>>,
) -> SchemeResponseResult<tauri::http::Response<Vec<u8>>> {
    let param: HandleFaviconParams = req.try_into()?;
    let bytes = get_favicon_from_cache(
        &Url::parse(format!("https://{}", param.domain).as_str())?,
        app,
    )?;
    tauri::http::Response::builder()
        .status(StatusCode::OK)
        .header(CONTENT_TYPE, "image/*")
        .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
        .body(bytes.into())
        .map_err(|e| SchemeResponseError::InternalError(Box::new(e)))
}
