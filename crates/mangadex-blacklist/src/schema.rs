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
    scanlation_groups_labels (scanlation_group, label) {
        scanlation_group -> Binary,
        label -> Binary,
        create_date -> Nullable<Timestamp>,
        notes -> Nullable<Text>,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Binary,
        username -> Text,
        insert_time -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users_labels (user, label) {
        user -> Binary,
        label -> Binary,
        create_date -> Nullable<Timestamp>,
        notes -> Nullable<Text>,
    }
}

diesel::joinable!(authors_labels -> labels (label));
diesel::joinable!(scanlation_groups_labels -> labels (label));
diesel::joinable!(scanlation_groups_labels -> scanlation_groups (scanlation_group));
diesel::joinable!(users_labels -> labels (label));
diesel::joinable!(users_labels -> users (user));

diesel::allow_tables_to_appear_in_same_query!(
    authors_artists,
    authors_labels,
    labels,
    scanlation_groups,
    scanlation_groups_labels,
    users,
    users_labels,
);
