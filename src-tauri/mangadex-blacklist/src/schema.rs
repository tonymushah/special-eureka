// @generated automatically by Diesel CLI.

diesel::table! {
    authors_artists (author_id) {
        author_id -> Binary,
        author_name -> Text,
        insert_date -> Nullable<Timestamp>,
    }
}
