use serde::Serialize;
use tauri::{AppHandle, Runtime};
#[cfg(feature = "updater")]
use tauri_plugin_updater::UpdaterExt;
use time::OffsetDateTime;

#[derive(Serialize, Clone)]
pub struct Update {
    pub version: String,
    pub current_version: String,
    pub description: Option<String>,
    pub publish_date: Option<OffsetDateTime>,
}

#[cfg(feature = "updater")]
impl From<tauri_plugin_updater::Update> for Update {
    fn from(value: tauri_plugin_updater::Update) -> Self {
        Self {
            version: value.version,
            current_version: value.current_version,
            description: value.body,
            publish_date: value.date,
        }
    }
}

#[tauri::command]
pub async fn check_for_updates<R: Runtime>(_app: AppHandle<R>) -> tauri::Result<Option<Update>> {
    #[cfg(feature = "updater")]
    {
        let update = _app
            .updater()
            .map_err(anyhow::Error::from)?
            .check()
            .await
            .map_err(anyhow::Error::from)?;
        Ok(update.map(Into::into))
    }
    #[cfg(not(feature = "updater"))]
    {
        Err(anyhow::anyhow!("Updater feature disabled").into())
    }
}

#[derive(Debug, Serialize, Clone)]
pub enum UpdatePayload {
    Starting,
    Downloading {
        downloaded: usize,
        content_lenght: Option<u64>,
    },
    Finished,
}

const UPDATE_PAYLOAD_EVENT_KEY: &str = "special-eureka://update-state";

#[tauri::command]
pub async fn download_and_install_updates<R: Runtime>(_app: AppHandle<R>) -> tauri::Result<()> {
    #[cfg(feature = "updater")]
    {
        use tauri::Emitter;

        let Some(update) = _app
            .updater()
            .map_err(anyhow::Error::from)?
            .check()
            .await
            .map_err(anyhow::Error::from)?
        else {
            return Ok(());
        };
        let mut downloaded = 0;
        let _ = _app.emit(UPDATE_PAYLOAD_EVENT_KEY, UpdatePayload::Starting);
        update
            .download_and_install(
                |chunck_length, content_lenght| {
                    downloaded += chunck_length;
                    let _ = _app.emit(
                        UPDATE_PAYLOAD_EVENT_KEY,
                        UpdatePayload::Downloading {
                            downloaded,
                            content_lenght,
                        },
                    );
                },
                || {
                    let _ = _app.emit(UPDATE_PAYLOAD_EVENT_KEY, UpdatePayload::Finished);
                },
            )
            .await
            .map_err(anyhow::Error::from)?;
        _app.restart();
    }
    #[cfg(not(feature = "updater"))]
    {
        Err(anyhow::anyhow!("Updater feature disabled").into())
    }
}
