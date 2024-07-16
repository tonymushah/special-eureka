use builder::get_builder;
use states::last_focused_window::LastFocusedWindow;
use tauri::{Manager, WindowEvent, Wry};

pub(crate) mod builder;
pub(crate) mod commands;
pub(crate) mod states;

pub fn run() {
    let context = tauri::generate_context!();

    match get_builder().build(context) {
        Ok(app) => app.run(|app_handle, e| {
            if let tauri::RunEvent::WindowEvent {
                label,
                event: WindowEvent::Focused(is_focused),
                ..
            } = e
            {
                if is_focused {
                    let last_focused_window_state = app_handle.state::<LastFocusedWindow<Wry>>();
                    if let Ok(mut write) = last_focused_window_state.write() {
                        if let Some(window) = app_handle.get_window(&label) {
                            write.replace(window);
                        }
                    };
                }
            }
        }),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
