use async_graphql::Enum;
use serde::{Deserialize, Serialize};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum ImageFit {
    #[default]
    Default,
    Width,
    Heigth,
}
