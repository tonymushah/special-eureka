use reqwest::header::InvalidHeaderValue;
use serde::{Serialize, Serializer};

/*
#[derive(Clone, serde::Serialize)]
struct ExportPayload {
    message: String,
}
*/

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("an io error occured {0}")]
    Io(#[from] std::io::Error),
    #[error("An internal manager error occures : {0}")]
    InternalServer(#[from] eureka_mmanager::Error),
    #[error("Internal Tauri Error : {0}")]
    Tauri(#[from] tauri::Error),
    #[error("Serde json serialization error : {0}")]
    SerdeJson(#[from] serde_json::Error),
    #[error("reqwest crate error : {0}")]
    Reqwest(#[from] reqwest::Error),
    #[error("invalid header value : {0}")]
    InvalidHeaderValue(#[from] InvalidHeaderValue),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

pub type Result<T, E = Error> = std::result::Result<T, E>;
