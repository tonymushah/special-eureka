use async_graphql::{Enum, Object};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum ReadingState {
    Previous,
    Current(u32),
    Next,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Enum)]
pub enum ReadingStateEnum {
    Previous,
    Current,
    Next,
}

impl From<ReadingState> for ReadingStateEnum {
    fn from(value: ReadingState) -> Self {
        match value {
            ReadingState::Previous => Self::Previous,
            ReadingState::Current(_) => Self::Current,
            ReadingState::Next => Self::Next,
        }
    }
}

impl ReadingState {
    pub async fn get_page(&self) -> Option<u32> {
        if let Self::Current(page) = *self {
            Some(page)
        } else {
            None
        }
    }
}

#[Object]
impl ReadingState {
    pub async fn state(&self) -> ReadingStateEnum {
        (*self).into()
    }
    pub async fn page(&self) -> Option<u32> {
        self.get_page()
    }
}
