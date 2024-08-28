use async_graphql::Context;
use tauri::Runtime;
use url::Url;

use crate::utils::get_app_handle_from_async_graphql;

pub async fn get_favicon<R: Runtime>(base_url: &Url, ctx: &Context<'_>) -> crate::Result<Url> {
    let app = get_app_handle_from_async_graphql::<R>(ctx)?;
    crate::cache::favicon::get_favicon(base_url, app).await?;
    Ok(Url::parse(
        format!(
            "{}favicons/{}",
            crate::constants::PROTOCOL,
            base_url
                .domain()
                .map(String::from)
                .ok_or(crate::Error::DomainUrlNotFound)?
        )
        .as_str(),
    )?)
}
