use std::{
    collections::{HashMap, HashSet},
    marker::PhantomData,
    sync::{Arc, Mutex},
};

use serde::{Deserialize, Serialize};
use tauri::{
    EventId, Listener, Manager, Position, Runtime, Webview,
    image::Image,
    ipc::CallbackFn,
    menu::{ContextMenu, IconMenuItemBuilder, IsMenuItem, MenuBuilder, MenuId, SubmenuBuilder},
};

#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum MaybeEventStreamData<T> {
    Data(T),
    Event {
        #[serde(rename = "eventName")]
        name: String,
        #[serde(rename = "initData")]
        init_data: T,
    },
}

impl<T: Default> Default for MaybeEventStreamData<T> {
	fn default() -> Self {
		Self::Data(Default::default())
	}
}

impl<T> MaybeEventStreamData<T> {
    pub fn data(&self) -> &T {
        match self {
            MaybeEventStreamData::Data(inner) => inner,
            MaybeEventStreamData::Event { init_data, .. } => init_data,
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "type")]
pub enum ContextMenuItem {
    MenuItem {
        text: MaybeEventStreamData<String>,
        action: CallbackFn,
        accelerator: Option<String>,
		#[serde(default)]
        enabled: MaybeEventStreamData<Option<bool>>,
        icon: Option<String>,
    },
    Submenu {
        text: MaybeEventStreamData<String>,
        #[serde(default)]
        items: Vec<ContextMenuItem>,
		#[serde(default)]
        enabled: MaybeEventStreamData<Option<bool>>,
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

pub struct UnlistenersHandle<L, R>
where
    R: Runtime,
    L: Listener<R>,
{
    listener: L,
    events: Option<HashSet<EventId>>,
    runtime: PhantomData<R>,
}

impl<L, R> UnlistenersHandle<L, R>
where
    R: Runtime,
    L: Listener<R>,
{
    pub fn new(listener: L) -> Self {
        Self {
            listener,
            events: Default::default(),
            runtime: PhantomData,
        }
    }
    pub fn add_event_id(&mut self, event: EventId) {
        self.events.get_or_insert_default().insert(event);
    }
    pub fn get_events(mut self) -> HashSet<EventId> {
        self.events.take().unwrap_or_default()
    }
}

impl<L, R> Drop for UnlistenersHandle<L, R>
where
    R: Runtime,
    L: Listener<R>,
{
    fn drop(&mut self) {
        if let Some(events) = self.events.take() {
            for event in events {
                self.listener.unlisten(event);
            }
        }
    }
}

type IntoItemResult<R, M> =
    Result<(Box<dyn IsMenuItem<R>>, UnlistenersHandle<M, R>), ContextMenuError>;

impl ContextMenuItem {
    pub fn into_item<R, M>(
        self,
        manager: &M,
        callbacks: &mut HashMap<MenuId, CallbackFn>,
    ) -> IntoItemResult<R, M>
    where
        R: Runtime,
        M: Manager<R> + Listener<R> + Clone,
    {
        let mut unlistenrs = UnlistenersHandle::new(manager.clone());
        match self {
            ContextMenuItem::MenuItem {
                text,
                action,
                accelerator,
                enabled,
                icon,
            } => {
                let mut builder = IconMenuItemBuilder::new(text.data())
                    .enabled((*enabled.data()).unwrap_or(true));
                if let Some(acc) = accelerator {
                    builder = builder.accelerator(acc);
                }
                if let Some(icon) = icon {
                    builder =
                        builder.icon(Image::from_path(manager.path().resource_dir()?.join(icon))?);
                }
                let item = builder.build(manager)?;
                callbacks.insert(item.id().clone(), action);
                if let MaybeEventStreamData::Event { name, .. } = text {
                    let item = item.clone();
                    unlistenrs.add_event_id(manager.listen(name, move |e| {
                        let _ = item.set_text(e.payload()).inspect_err(|e| {
                            log::error!("{e}");
                        });
                    }));
                }
                if let MaybeEventStreamData::Event { name, .. } = enabled {
                    let item = item.clone();
                    unlistenrs.add_event_id(manager.listen(name, move |e| {
                        if let Ok(enabled) = serde_json::from_str::<Option<bool>>(e.payload()) {
                            let _ = item.set_enabled(enabled.unwrap_or(true)).inspect_err(|e| {
                                log::error!("{e}");
                            });
                        }
                    }));
                }
                Ok((Box::new(item), unlistenrs))
            }
            ContextMenuItem::Submenu {
                text,
                items,
                enabled,
            } => {
                let mut builder = SubmenuBuilder::new(manager, text.data());
                if let Some(enabled) = enabled.data() {
                    builder = builder.enabled(*enabled);
                }

                for item in items {
                    match item {
                        Self::Seperator => {
                            builder = builder.separator();
                        }
                        item => {
                            let (item, u) = item.into_item(manager, callbacks)?;
                            for event in u.get_events() {
                                unlistenrs.add_event_id(event);
                            }
                            builder = builder.item(&*item);
                        }
                    }
                }
                let item = builder.build()?;
                if let MaybeEventStreamData::Event { name, .. } = text {
                    let item = item.clone();
                    unlistenrs.add_event_id(manager.listen(name, move |e| {
                        let _ = item.set_text(e.payload()).inspect_err(|e| {
                            log::error!("{e}");
                        });
                    }));
                }
                if let MaybeEventStreamData::Event { name, .. } = enabled {
                    let item = item.clone();
                    unlistenrs.add_event_id(manager.listen(name, move |e| {
                        if let Ok(enabled) = serde_json::from_str::<Option<bool>>(e.payload()) {
                            let _ = item.set_enabled(enabled.unwrap_or(true)).inspect_err(|e| {
                                log::error!("{e}");
                            });
                        }
                    }));
                }
                Ok((Box::new(item), unlistenrs))
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
    let mut unlistenrs = UnlistenersHandle::new(webview.clone());
    for item in items {
        match item {
            ContextMenuItem::Seperator => {
                menu_builder = menu_builder.separator();
            }
            item => {
                let (item, u) = item.into_item(&webview, &mut callbacks)?;
                for event in u.get_events() {
                    unlistenrs.add_event_id(event);
                }
                menu_builder = menu_builder.item(&*item);
            }
        }
    }
    let menu = menu_builder.build()?;
    {
        let webview_1 = webview.clone();
        let callbacks = Arc::new(Mutex::new(Some(callbacks)));
        webview.window().on_menu_event(move |_, id| {
            if let Ok(mut callbacks) = callbacks.lock() {
                if let Some(callback) = callbacks.as_ref().and_then(|cs| cs.get(id.id())) {
                    if let Err(err) = webview_1.eval(format!(
                        "window.__TAURI_INTERNALS__.runCallback({})",
                        callback.0
                    )) {
                        log::error!("{} => {}", id.id().0, err);
                    }
                    let _ = callbacks.take();
                }
            }
        });
    }
    menu.popup_at(webview.window().clone(), position)?;
    Ok(())
}
