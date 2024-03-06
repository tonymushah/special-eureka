use tauri::Runtime;

use crate::{
    ins_handle::{check_plus_notify, init_ins_chapter_handle, set_ins_chapter_checker_handle},
    utils::set_indentifier,
};

pub fn ins_handle<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::plugin::Result<()> {
    let identifier = app.config().tauri.bundle.identifier.clone();
    match set_indentifier(identifier) {
        Ok(_) => (),
        Err(err) => {
            panic!("{}", err.to_string());
        }
    };

    init_ins_chapter_handle()?;
    set_ins_chapter_checker_handle(std::thread::spawn(|| loop {
        match check_plus_notify() {
            Ok(()) => (),
            Err(error) => {
                println!("{}", error);
            }
        }
        std::thread::sleep(std::time::Duration::from_millis(500));
    }))?;
    Ok(())
}
