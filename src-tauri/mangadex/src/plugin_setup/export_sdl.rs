pub fn export_sdl(schema: &Schema<Q, M, S>, config: &PluginConfig) -> tauri::plugin::Result<()> {
    let mut file_bufw = BufWriter::new(File::create(config.sdl_export_path.as_str())?);
    file_bufw.write_all(schema.sdl().as_bytes())?;
    file_bufw.flush()?;
    Ok(())
}
