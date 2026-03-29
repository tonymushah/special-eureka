use std::{
    env,
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
    let mut file_dispatch = {
        let mut dis = Dispatch::new();
        let maybe_env = env::var("RUST_LOG_FILE")
            .ok()
            .filter(|s| !s.is_empty())
            .map(|s| env_filter::Builder::from_env(&s).build());
        if let Some(env) = maybe_env {
            dis = dis.filter(move |metadata| env.enabled(metadata));
        } else {
            dis = dis.level(log::LevelFilter::Info);
        }

        dis
    };
    file_dispatch = file_dispatch
        .format(move |out, msg, record| {
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
        dispacher = dispacher.chain({
            let e_f = env_filter::Builder::from_env("RUST_ENV_LOG").build();
            let color = fern::colors::ColoredLevelConfig::new()
                .debug(fern::colors::Color::BrightCyan)
                .info(fern::colors::Color::Green)
                .trace(fern::colors::Color::Magenta);

            Dispatch::new()
                .filter(move |metadata| e_f.enabled(metadata))
                .format(move |out, msg, record| {
                    out.finish(format_args!(
                        "[{} {}] {}",
                        color.color(record.level()),
                        record.target(),
                        msg
                    ));
                })
                .chain(std::io::stderr())
        });
    }

    dispacher = dispacher.chain(file_dispatch);

    dispacher.apply()?;

    Ok(())
}
