use std::time::SystemTime;

use fern::{log_file, Dispatch};
use tauri::{App, Manager, Runtime};

pub fn setup_logger<R: Runtime>(app: &App<R>) -> anyhow::Result<()> {
    let file_dispatch = Dispatch::new()
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
