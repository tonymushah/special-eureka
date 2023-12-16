use std::path::Path;

fn main() {
    tauri_plugin_speu_mangadex::MangadexDesktopApi::default()
        .export_sdl(Path::new("../src/mangadex/schema.graphqls").to_path_buf())
        .unwrap()
}
