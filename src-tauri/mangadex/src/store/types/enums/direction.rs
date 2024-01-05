pub mod reading;
pub mod sidebar;

use async_graphql::Enum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
pub enum Direction {
    RTL,
    LTR,
}

impl Default for Direction {
    fn default() -> Self {
        Self::LTR
    }
}
