use crate::{
    Result,
    error::Error,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};
use async_graphql::{Context, Object};

use crate::{
    objects::upload::session::UploadSession,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

use mangadex_api_types_rust::error::Error as MangaDexErrors;

#[derive(Debug, Clone, Copy)]
pub struct UploadQueries;

#[Object]
impl UploadQueries {
    pub async fn get_current(&self, ctx: &Context<'_>) -> Result<Option<UploadSession>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .get_upload()
            .await;
        match client.upload().get().send().await {
            Ok(u) => {
                let data: UploadSession = u.body.data.into();
                let _ = watches.upload_session.send_data(data.clone());
                Ok(Some(data))
            }
            Err(e) => {
                if let MangaDexErrors::Api(ref error) = e {
                    if error.errors.iter().any(|error_| error_.status == 404) {
                        return Ok(None);
                    }
                }
                Err(Error::MangadexApi(e))
            }
        }
    }
}
