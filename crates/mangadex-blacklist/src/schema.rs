// @generated automatically by Diesel CLI.

diesel::table! {
    authors_artists (author_id) {
        author_id -> Binary,
        author_name -> Text,
        insert_time -> Nullable<Timestamp>,
    }
}

diesel::table! {
    authors_labels (author, label) {
        author -> Binary,
        label -> Binary,
        create_date -> Nullable<Timestamp>,
        notes -> Nullable<Text>,
    }
}

diesel::table! {
    labels (label_id) {
        label_id -> Binary,
        name -> Text,
        create_date -> Nullable<Timestamp>,
        description -> Nullable<Text>,
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

diesel::joinable!(authors_labels -> labels (label));

diesel::allow_tables_to_appear_in_same_query!(
    authors_artists,
    authors_labels,
    labels,
    scanlation_groups,
    users,
);
