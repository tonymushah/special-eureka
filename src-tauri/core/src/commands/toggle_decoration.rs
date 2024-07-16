use tauri::{command, Result, Runtime, Window};

fn menu_handle<R: Runtime>(window: &Window<R>, is_decorated: bool) -> Result<()> {
    if is_decorated {
        window.menu_handle().show()?;
    } else {
        window.menu_handle().hide()?;
    }
    Ok(())
}

#[command]
pub fn toggle_decoration<R: Runtime>(window: Window<R>) -> Result<()> {
    let is_decorated = window.is_decorated()?;
    window.set_decorations(!is_decorated)?;
    let _ = menu_handle(&window, !is_decorated);
    window.emit("decoration", None::<()>)?;
    Ok(())
}
