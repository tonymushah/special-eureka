use std::time::{Duration, Instant};

use tauri::{AppHandle, Runtime};

use crate::utils::{traits_utils::MangadexTauriManagerExt, watch::SendData};

pub async fn refresh_token<R: Runtime>(app: AppHandle<R>) -> crate::Result<()> {
    let client = app.get_mangadex_client()?;
    let last_time_fetched = app.get_last_time_token_when_fetched()?;
    let watches = app.get_watches()?;
    let should_fetched: bool = {
        let inner = last_time_fetched
            .get()
            .await
            .ok_or(crate::Error::NotLoggedIn)?;

        #[cfg(debug_assertions)]
        {
            super::print_instant(inner.into());
        }

        inner < Instant::now().into()
    };

    if should_fetched {
        client.ping().get().send().await?;
        #[cfg(debug_assertions)]
        log::debug!("Should be fetched");
        app.get_specific_rate_limit()?.refresh().await;
        match client.oauth().refresh().send().await {
            Ok(res) => {
                // NOTE Made a bold mistake of using `Duration::from_millis` instead of `from_secs`
                let _ = last_time_fetched
                    .replace((Instant::now() + (Duration::from_secs(res.expires_in as u64))).into())
                    .await;
                let _ = watches.is_logged.send_data(true);
            }
            Err(err) => {
                let _ = watches.is_logged.send_data(false);
                log::error!("{err}");
                return Err(err.into());
            }
        }
    }
    Ok(())
}
