use tauri::{command, Result, Runtime, Window};

#[command]
pub fn toggle_decoration<R: Runtime>(window: Window<R>) -> Result<()> {
    window.set_decorations(!(window.is_decorated()?))?;
    window.emit("decoration", None::<()>)?;
    Ok(())
}
