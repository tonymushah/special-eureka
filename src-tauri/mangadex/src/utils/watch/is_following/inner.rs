use mangadex_api_types_rust::RelationshipType;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub struct IsFollowingInnerData {
    type_: RelationshipType,
    data: bool,
}
