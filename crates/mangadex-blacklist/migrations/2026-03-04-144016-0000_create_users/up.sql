-- users blacklist
create table users(
	user_id BLOB PRIMARY KEY NOT NULL,
	username TEXT NOT NULL,
	insert_time DATETIME DEFAULT datetime
);