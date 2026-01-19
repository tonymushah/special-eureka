use std::{
    fs::{create_dir_all, read_dir, remove_file},
    time::SystemTime,
};

use fern::{Dispatch, log_file};
use tauri::{App, Manager, Runtime};

pub fn setup_logger<R: Runtime>(app: &App<R>) -> anyhow::Result<()> {
    create_dir_all(app.path().app_log_dir()?)?;
    if read_dir(app.path().app_log_dir()?)
        .map(|c| c.count())
        .unwrap_or_default()
        > 100
    {
        for e in read_dir(app.path().app_log_dir()?)?.flatten() {
            remove_file(e.path())?;
        }
    }
    let file_dispatch = Dispatch::new()
        .level(log::LevelFilter::Info)
        .format(|out, msg, record| {
            out.finish(format_args!(
                "[{} {} {}] {}",
                humantime::format_rfc3339_seconds(SystemTime::now()),
                record.level(),
                record.target(),
                msg
            ));
        })
        .chain(log_file(app.path().app_log_dir()?.join("latest.log"))?)
        .chain(log_file(app.path().app_log_dir()?.join({
            let now = time::OffsetDateTime::now_local()?;
            let format =
                time::macros::format_description!("[day]-[month]-[year]_[hour]_[minute]_[second]");
            format!("{}.log", now.format(format)?)
        }))?);

    #[allow(unused_must_use)]
    let mut dispacher = Dispatch::new();

    #[cfg(debug_assertions)]
    {
        dispacher = dispacher.chain(
            Dispatch::new()
                .level(log::LevelFilter::Debug)
                .chain(std::io::stdout()),
        );
    }

    dispacher = dispacher.chain(file_dispatch);

    dispacher.apply()?;

    Ok(())
}
