// @generated automatically by Diesel CLI.

diesel::table! {
    persistent_queries (key) {
        key -> Text,
        operations -> Binary,
        fragments -> Binary,
        insert_date -> Nullable<Timestamp>,
        last_update -> Nullable<Timestamp>,
    }
}
