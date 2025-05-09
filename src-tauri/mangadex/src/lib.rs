use async_graphql::Schema;
use mutation::Mutation;
use plugin_setup::setup;
// use mangadex_desktop_api2::AppState;
use query::Query;
use tauri::Runtime;

use mizuki::MizukiPlugin;
use subscription::Subscriptions;

pub mod app_state;
pub mod cache;
pub mod constants;
pub mod error;
pub mod ins_handle;
pub mod intelligent_notification_system;
pub mod mutation;
pub mod objects;
mod plugin_setup;
pub mod query;
pub mod rate_limit;
pub mod scheme;
pub mod store;
pub mod subscription;
pub mod utils;

type Q = Query;
type M = Mutation;
type S = Subscriptions;

pub(crate) type Result<T, E = error::Error> = std::result::Result<T, E>;
pub(crate) use plugin_setup::PluginSetupResult;

pub use error::Error;

pub fn init<R: Runtime>() -> MizukiPlugin<R, Q, M, S> {
    mizuki::Builder::new(
        "mangadex-desktop-api",
        Schema::new(Query, Mutation, Subscriptions::default()),
    )
    .setup(setup)
    .build()
}

/*
    <https://regex101.com/r/rI3jhp/1>
    might be usefule in the future

*/
