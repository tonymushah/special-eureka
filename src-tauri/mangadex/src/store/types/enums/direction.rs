pub mod reading;
pub mod sidebar;

use async_graphql::Enum;
use serde::{Deserialize, Serialize};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum Direction {
    RTL,
    #[default]
    LTR,
}
