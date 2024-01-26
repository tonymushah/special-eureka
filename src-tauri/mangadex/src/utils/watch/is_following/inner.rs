use mangadex_api_types_rust::RelationshipType;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub struct IsFollowingInnerData {
    pub type_: RelationshipType,
    pub data: bool,
}
