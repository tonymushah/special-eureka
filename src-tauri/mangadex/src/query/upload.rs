use async_graphql::{Context, Error, Object, Result};

use crate::{
    objects::upload::session::UploadSession,
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

use mangadex_api_types_rust::error::Error as MangaDexErrors;

#[derive(Debug, Clone, Copy)]
pub struct UploadQueries;

#[Object]
impl UploadQueries {
    pub async fn get_current(&self, ctx: &Context<'_>) -> Result<Option<UploadSession>> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        match client.upload().get().send().await {
            Ok(u) => Ok(Some(u.body.data.into())),
            Err(e) => {
                if let MangaDexErrors::Api(ref error) = e {
                    if error.errors.iter().any(|error_| error_.status == 404) {
                        return Ok(None);
                    }
                }
                Err(Error::new_with_source(e))
            }
        }
    }
}
