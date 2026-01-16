use actix::System;
use builder::get_builder;
use runtime::RuntimeGuard;
use states::last_focused_window::LastFocusedWindow;
use tauri::{Manager, WindowEvent, Wry};
use tokio::runtime::Builder as RuntimeBuilder;

use std::sync::{Arc, Mutex};

pub(crate) mod builder;
pub(crate) mod commands;
#[cfg(feature = "hotpath")]
mod hot_path;
pub(crate) mod logging;
pub(crate) mod runtime;
pub(crate) mod states;

pub fn run() {
    #[cfg(feature = "hotpath")]
    let _hot_guard = Arc::new(Mutex::new(Some(hot_path::init_hotpath())));

    let runtime_guard = RuntimeGuard::new(|| {
        #[cfg(not(feature = "actix-multi-threaded"))]
        {
            RuntimeBuilder::new_current_thread()
                .enable_all()
                .build()
                .unwrap()
        }
        #[cfg(feature = "actix-multi-threaded")]
        {
            RuntimeBuilder::new_multi_thread()
                .enable_all()
                .build()
                .unwrap()
        }
    })
    .unwrap();
    let context = tauri::tauri_build_context!();
    System::set_current(runtime_guard.sys().clone());

    #[cfg(feature = "single-runtime")]
    {
        tauri::async_runtime::set(runtime_guard.handle().clone());
    }

    let runtime_guard = Arc::new(Mutex::new(Some(runtime_guard)));

    match get_builder().build(context) {
        Ok(app) => {
            if let Err(err) = logging::setup_logger(&app) {
                eprintln!("{err}")
            }
            app.run(move |app_handle, e| match e {
                tauri::RunEvent::WindowEvent {
                    label,
                    event: WindowEvent::Focused(is_focused),
                    ..
                } => {
                    if is_focused {
                        let last_focused_window_state =
                            app_handle.state::<LastFocusedWindow<Wry>>();
                        if let Ok(mut write) = last_focused_window_state.write()
                            && let Some(window) = app_handle.get_window(&label) {
                                write.replace(window);
                            };
                    }
                }
                tauri::RunEvent::Exit => {
                    if let Ok(mut lock) = runtime_guard.lock()
                        && let Some(runtime) = lock.take() {
                            runtime.cleanup().unwrap()
                        }
                    #[cfg(feature = "hotpath")]
                    {
                        if let Ok(mut lock) = _hot_guard.lock() {
                            let _ = lock.take();
                        }
                    }
                }
                _ => {}
            })
        }
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}

#[allow(unused)]
pub(crate) const SPECIAL_EUREKA_ERROR_EVENT_KEY: &str = "special-eureka://internal-error";

#[macro_export]
macro_rules! measure_block {
    ($label:expr, $expr:expr) => {
        #[cfg(feature = "hotpath")]
        {
            hotpath::measure_block!($label, $expr)
        }
        #[cfg(not(feature = "hotpath"))]
        {
            $expr
        }
    };
}
