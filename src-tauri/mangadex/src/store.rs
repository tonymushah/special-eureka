use tauri::{AppHandle, Runtime};
use tauri_plugin_store::StoreBuilder;

use self::{
    keys::PATH,
    types::{
        structs::{client_info::ClientInfoStore, refresh_token::RefreshTokenStore},
        DefaulStore,
    },
};

pub mod keys;
pub mod types;

pub fn get_store_builder<R: Runtime>(app: AppHandle<R>) -> tauri::plugin::Result<StoreBuilder<R>> {
    let builder = {
        let b = StoreBuilder::new(app, PATH.parse()?);
        RefreshTokenStore::default_store(ClientInfoStore::default_store(b)?)?
    };
    Ok(builder)
}
