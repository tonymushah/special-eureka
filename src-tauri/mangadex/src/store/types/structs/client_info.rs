use crate::{
    objects::oauth::ClientInfo,
    store::{
        keys::CLIENT_INFO,
        types::{DefaulStore, ExtractFromStore, StoreCrud},
    },
};
use mangadex_api_schema_rust::v5::oauth::ClientInfo as Info;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ClientInfoStore(Option<ClientInfo>);

impl Deref for ClientInfoStore {
    type Target = Option<ClientInfo>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ClientInfoStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl ClientInfoStore {
    pub fn inner(self) -> Option<ClientInfo> {
        self.0
    }
}

impl From<Option<ClientInfo>> for ClientInfoStore {
    fn from(value: Option<ClientInfo>) -> Self {
        Self(value)
    }
}

impl From<ClientInfo> for ClientInfoStore {
    fn from(value: ClientInfo) -> Self {
        Self(Some(value))
    }
}

impl From<Info> for ClientInfoStore {
    fn from(value: Info) -> Self {
        let value: ClientInfo = value.into();
        value.into()
    }
}

impl<'de, R> ExtractFromStore<'de, R> for ClientInfoStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CLIENT_INFO) {
            let client: Option<ClientInfo> = serde_json::from_value(info.clone())?;
            Ok(Self(client))
        } else {
            Ok(Self(None))
        }
    }
}

impl<R> StoreCrud<R> for ClientInfoStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(CLIENT_INFO.to_string(), serde_json::to_value(self.clone())?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CLIENT_INFO);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ClientInfoStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(CLIENT_INFO.to_string(), None::<bool>))
    }
}
