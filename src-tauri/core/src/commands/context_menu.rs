use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use tauri::{
    Manager, Position, Runtime, Webview,
    image::Image,
    ipc::CallbackFn,
    menu::{ContextMenu, IconMenuItemBuilder, IsMenuItem, MenuBuilder, MenuId, SubmenuBuilder},
};

#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "type")]
pub enum ContextMenuItem {
    MenuItem {
        text: String,
        action: CallbackFn,
        accelerator: Option<String>,
        enabled: Option<bool>,
        icon: Option<String>,
    },
    Submenu {
        text: String,
        #[serde(default)]
        items: Vec<ContextMenuItem>,
		enabled: Option<bool>
    },
    Seperator,
}

#[derive(Debug, thiserror::Error)]
#[error(transparent)]
pub enum ContextMenuError {
    Tauri(#[from] tauri::Error),
    #[error("Unhandled seperator context menu item")]
    Seperator,
}

impl Serialize for ContextMenuError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.to_string().serialize(serializer)
    }
}

impl ContextMenuItem {
    pub fn to_item<R, M>(
        &self,
        manager: &M,
        callbacks: &mut HashMap<MenuId, CallbackFn>,
    ) -> Result<Box<dyn IsMenuItem<R>>, ContextMenuError>
    where
        R: Runtime,
        M: Manager<R>,
    {
        match self {
            ContextMenuItem::MenuItem {
                text,
                action,
                accelerator,
                enabled,
                icon,
            } => {
                let mut builder = IconMenuItemBuilder::new(text).enabled(enabled.unwrap_or(true));
                if let Some(acc) = accelerator {
                    builder = builder.accelerator(acc);
                }
                if let Some(icon) = icon {
                    builder =
                        builder.icon(Image::from_path(manager.path().resource_dir()?.join(icon))?);
                }
                let item = builder.build(manager)?;
                callbacks.insert(item.id().clone(), *action);
                Ok(Box::new(item))
            }
            ContextMenuItem::Submenu { text, items, enabled } => {
                let mut builder = SubmenuBuilder::new(manager, text);
				if let Some(enabled) = enabled {
					builder = builder.enabled(*enabled);
				}
                for item in items {
                    match item {
                        Self::Seperator => {
                            builder = builder.separator();
                        }
                        item => {
                            builder = builder.item(&*item.to_item(manager, callbacks)?);
                        }
                    }
                }
                Ok(Box::new(builder.build()?))
            }
            Self::Seperator => Err(ContextMenuError::Seperator),
        }
    }
}

#[tauri::command]
pub async fn context_menu<R: Runtime>(
    webview: Webview<R>,
    items: Vec<ContextMenuItem>,
    position: Position,
) -> Result<(), ContextMenuError> {
    let mut callbacks = HashMap::<MenuId, CallbackFn>::new();
    let mut menu_builder = MenuBuilder::new(&webview);
    for item in items {
        match item {
            ContextMenuItem::Seperator => {
                menu_builder = menu_builder.separator();
            }
            item => {
                menu_builder = menu_builder.item(&*item.to_item(&webview, &mut callbacks)?);
            }
        }
    }
    let menu = menu_builder.build()?;
    {
        let webview_1 = webview.clone();
        webview.window().on_menu_event(move |_, id| {
            if let Some(callback) = callbacks.get(id.id()) {
                if let Err(err) = webview_1.eval(format!(
                    "window.__TAURI_INTERNALS__.runCallback({})",
                    callback.0
                )) {
                    log::error!("{} => {}", id.id().0, err);
                }
            }
        });
    }
    menu.popup_at(webview.window().clone(), position)?;
    Ok(())
}
