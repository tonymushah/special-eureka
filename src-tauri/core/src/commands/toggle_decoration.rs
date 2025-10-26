use tauri::{Emitter, EventTarget, Result, Runtime, Window, command};

fn menu_handle<R: Runtime>(window: &Window<R>) -> Result<()> {
    if window.is_decorated()? {
        window.show_menu()?;
    } else {
        window.hide_menu()?;
    }
    Ok(())
}

#[command]
#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn toggle_decoration<R: Runtime>(window: Window<R>, decoration: Option<bool>) -> Result<()> {
    window.set_decorations(decoration.unwrap_or(!window.is_decorated()?))?;
    let _ = menu_handle(&window);
    window.emit_to(
        EventTarget::WebviewWindow {
            label: window.label().into(),
        },
        "decoration",
        None::<()>,
    )?;
    Ok(())
}
