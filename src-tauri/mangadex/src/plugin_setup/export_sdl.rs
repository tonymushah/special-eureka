use std::{
    fs::File,
    io::{BufWriter, Write},
};

use async_graphql::Schema;

use crate::{M, Q, S};

use super::plugin_config::PluginConfig;

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
pub fn export_sdl(schema: &Schema<Q, M, S>, config: &PluginConfig) -> crate::PluginSetupResult<()> {
    let mut file_bufw = BufWriter::new(File::create(config.sdl_export_path.as_str())?);
    file_bufw.write_all(schema.sdl().as_bytes())?;
    file_bufw.flush()?;
    Ok(())
}
