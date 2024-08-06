use tauri::{api::http::StatusCode, http::Request, AppHandle, Runtime};
use url::Url;

use super::{SchemeResponseError, SchemeResponseResult};

use crate::cache::favicon::get_favicon_from_cache;

pub struct HandleFaviconParams {
    pub domain: String,
}

impl TryFrom<&Request> for HandleFaviconParams {
    type Error = SchemeResponseError;
    fn try_from(value: &Request) -> Result<Self, Self::Error> {
        let uri = Url::parse(value.uri())?;
        let domain = uri.path();
        Ok(Self {
            domain: String::from(domain),
        })
    }
}

pub fn handle_favicon<'a, R: Runtime>(
    app: &'a AppHandle<R>,
    req: &'a Request,
) -> SchemeResponseResult<tauri::http::Response> {
    let param: HandleFaviconParams = req.try_into()?;
    let bytes = get_favicon_from_cache(
        &Url::parse(format!("https://{}", param.domain).as_str())?,
        app.config().as_ref(),
    )?;
    tauri::http::ResponseBuilder::new()
        .status(StatusCode::OK)
        .mimetype("image/*")
        .header("access-control-allow-origin", "*")
        .body(bytes.into())
        .map_err(SchemeResponseError::InternalError)
}
