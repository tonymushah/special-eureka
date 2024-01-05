use async_graphql::Enum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
pub enum ReadingMode {
    LongStrip,
    WideStrip,
    SinglePage,
    DoublePage,
}

impl Default for ReadingMode {
    fn default() -> Self {
        Self::DoublePage
    }
}
