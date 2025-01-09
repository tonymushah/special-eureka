use mangadex_api_schema_rust::v5::{oauth::OAuthTokenResponse, AuthTokens};
use mangadex_api_types_rust::MangaDexDateTime;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;
use time::Duration;

use crate::store::{
    keys::REFRESH_TOKEN,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RefreshTokenData {
    pub refresh_token: String,
    #[serde(serialize_with = "mangadex_api_schema_rust::v5::mangadex_datetime_serialize")]
    pub expires_in: MangaDexDateTime,
}

impl From<RefreshTokenData> for AuthTokens {
    fn from(value: RefreshTokenData) -> Self {
        Self {
            session: String::new(),
            refresh: value.refresh_token,
        }
    }
}

impl From<&RefreshTokenData> for AuthTokens {
    fn from(value: &RefreshTokenData) -> Self {
        Self {
            session: String::new(),
            refresh: value.refresh_token.clone(),
        }
    }
}

impl From<OAuthTokenResponse> for RefreshTokenData {
    fn from(value: OAuthTokenResponse) -> Self {
        let expires_in =
            MangaDexDateTime::default()
                .as_ref()
                .saturating_add(Duration::saturating_seconds_f64(
                    value.refresh_expires_in.into(),
                ));
        let expires_in = MangaDexDateTime::new(&expires_in);

        Self {
            refresh_token: value.refresh_token,
            expires_in,
        }
    }
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct RefreshTokenStore(Option<RefreshTokenData>);

impl Deref for RefreshTokenStore {
    type Target = Option<RefreshTokenData>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for RefreshTokenStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl<'de, R> ExtractFromStore<'de, R> for RefreshTokenStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(REFRESH_TOKEN) {
            let client: Option<RefreshTokenData> = serde_json::from_value(info.clone())?;
            Ok(Self(client))
        } else {
            Ok(Self(None))
        }
    }
}

impl<R> StoreCrud<R> for RefreshTokenStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            REFRESH_TOKEN.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(REFRESH_TOKEN);
        Ok(())
    }
}

impl<R> DefaulStore<R> for RefreshTokenStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(REFRESH_TOKEN.to_string(), None::<bool>))
    }
}
impl From<RefreshTokenData> for RefreshTokenStore {
    fn from(value: RefreshTokenData) -> Self {
        Self(Some(value))
    }
}

impl From<OAuthTokenResponse> for RefreshTokenStore {
    fn from(value: OAuthTokenResponse) -> Self {
        let value: RefreshTokenData = value.into();
        value.into()
    }
}
