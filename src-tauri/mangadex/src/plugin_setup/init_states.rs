use tauri::{Manager, Runtime};

use crate::{
    app_state::OfflineAppState, rate_limit::SpecificRateLimits, store::get_store_builder,
    utils::store::MangaDexStoreState,
};

use super::{
    init_client_state::init_client_state, init_watches_states::init_watches_states,
    plugin_config::PluginConfig,
};

pub fn init_states<R: Runtime>(
    app: &tauri::AppHandle<R>,
    cfg: &PluginConfig,
) -> crate::PluginSetupResult<()> {
    app.manage(SpecificRateLimits::from(&cfg.ratelimit.specific));
    let store = get_store_builder(app.clone())?.build()?;
    init_watches_states(app, &store)?;
    init_client_state(app, &store)?;
    app.manage(OfflineAppState::default());
    app.manage(MangaDexStoreState::new_from_store(store));
    Ok(())
}
