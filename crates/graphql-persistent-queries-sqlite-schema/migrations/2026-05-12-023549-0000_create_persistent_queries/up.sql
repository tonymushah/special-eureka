-- Your SQL goes here
create table persistent_queries(
	key TEXT PRIMARY KEY NOT NULL,
	operations blob NOT NULL,
	fragments blob NOT NULL,
	insert_date DATETIME default CURRENT_TIMESTAMP,
	last_update DATETIME default CURRENT_TIMESTAMP
);