use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::UserAttributes as Attributes};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{GetAttributes, GetId, user::attributes::UserAttributes};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<UserAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRUser = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct UserWatch(Arc<Inner>);

impl Deref for UserWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for UserWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for UserWatch
where
    T: GetId + GetAttributes<Attributes = UserAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRUser {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::User,
            attributes: value.attributes.into(),
        }
    }
}
