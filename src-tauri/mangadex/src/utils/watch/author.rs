use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{v5::AuthorAttributes as Attributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::author::attributes::AuthorAttributes;

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<AuthorAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRAuthor = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct AuthorWatch(Arc<Inner>);

impl Deref for AuthorWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for AuthorWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for AuthorWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        if let Err(err) = self.send(Some(data.into())) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}

impl From<InnerData> for AONRAuthor {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Author,
            attributes: value.attributes.into(),
        }
    }
}
