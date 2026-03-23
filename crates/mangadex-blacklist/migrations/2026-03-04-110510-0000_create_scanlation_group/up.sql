-- Your SQL goes here
create table scanlation_groups(
	group_id BLOB PRIMARY KEY NOT NULL,
	group_name TEXT NOT NULL,
	insert_time DATETIME DEFAULT (datetime('locatime'))
);