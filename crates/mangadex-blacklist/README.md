# mangadex-blacklist-raw

Only the diesel schema and the migration are here (for compile-time optimization with `diesel`).
For the actual logic, go to `src-tauri/mangadex/blacklist.rs` module.

Don't forget to make a `blacklist.db` in this current directory and a `.env` with a `DATABASE_URL=./blacklist.db` if you are going to create new migrations.
