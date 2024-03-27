use builder::get_builder;

pub(crate) mod builder;
pub(crate) mod commands;
pub(crate) mod states;

pub fn run() {
    let context = tauri::generate_context!();

    match get_builder().build(context) {
        Ok(app) => app.run(|_app_handle, _event| {}),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
