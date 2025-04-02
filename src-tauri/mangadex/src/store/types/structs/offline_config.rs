use crate::store::{
    keys::OFFLINE_CONFIG as KEY,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};
use eureka_mmanager::DirsOptions;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::{Manager, Runtime};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct OfflineConfig {
    pub dir_options: DirsOptions,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct OfflineConfigStore(Option<OfflineConfig>);

impl Deref for OfflineConfigStore {
    type Target = Option<OfflineConfig>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for OfflineConfigStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl OfflineConfigStore {
    pub fn inner(self) -> Option<OfflineConfig> {
        self.0
    }
}

impl<R> ExtractFromStore<'_, R> for OfflineConfigStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(KEY) {
            let client: Option<OfflineConfig> = serde_json::from_value(info.clone())?;
            Ok(Self(client))
        } else {
            Ok(Self(None))
        }
    }
}

impl<R> StoreCrud<R> for OfflineConfigStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(KEY.to_string(), serde_json::to_value(self.clone())?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(KEY);
        Ok(())
    }
}

impl<R> DefaulStore<R> for OfflineConfigStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(KEY.to_string(), None::<()>))
    }
}

impl OfflineConfigStore {
    pub fn get_dir_options<R: Runtime, M: Manager<R>>(
        &self,
        app: &M,
    ) -> crate::Result<DirsOptions> {
        let dirs_options = self
            .as_ref()
            .map(|s| s.dir_options.clone())
            .or_else(|| {
                dirs::data_dir()
                    .map(|p| p.join(&app.config().identifier))
                    .map(DirsOptions::new_from_data_dir)
            })
            .unwrap_or(DirsOptions::new_from_data_dir(std::path::absolute("data")?));
        Ok(dirs_options)
    }
}
