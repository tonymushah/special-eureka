use std::{
    fs::File,
    io::{BufWriter, Write},
    path::Path,
};

use uuid::Uuid;

pub async fn export_uuids_as_txt(uuids: Vec<Uuid>, file: String) -> crate::Result<String> {
    let export_path = Path::new(&file);
    let mut file = File::create(export_path)?;
    {
        let mut writer = BufWriter::new(&mut file);
        for id in uuids {
            writeln!(&mut writer, "{id}")?;
        }
        writer.flush()?;
    }
    file.flush()?;
    export_path
        .to_str()
        .map(String::from)
        .ok_or(crate::Error::PathToStr)
}
