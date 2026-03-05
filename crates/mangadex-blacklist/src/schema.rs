// @generated automatically by Diesel CLI.

diesel::table! {
    authors_artists (author_id) {
        author_id -> Binary,
        author_name -> Text,
        insert_time -> Nullable<Timestamp>,
    }
}

diesel::table! {
    scanlation_groups (group_id) {
        group_id -> Binary,
        group_name -> Text,
        insert_time -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Binary,
        username -> Text,
        insert_time -> Nullable<Timestamp>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(authors_artists, scanlation_groups, users,);
