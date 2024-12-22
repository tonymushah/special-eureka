use actix::System;
use builder::get_builder;
use states::last_focused_window::LastFocusedWindow;
use tauri::{Manager, WindowEvent, Wry};
use tokio::runtime::Builder as RuntimeBuilder;

pub(crate) mod builder;
pub(crate) mod commands;
pub(crate) mod states;

pub fn run() {
    let system_runner = System::with_tokio_rt(|| {
        RuntimeBuilder::new_multi_thread()
            .enable_all()
            .build()
            .unwrap()
    });
    let context = tauri::generate_context!();
    tauri::async_runtime::set(system_runner.runtime().tokio_runtime().handle().clone());

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
