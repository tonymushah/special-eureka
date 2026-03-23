-- Your SQL goes here
create table labels(
	label_id BLOB primary key not null,
	name TEXT not null,
	create_date DATETIME default 'now',
	description TEXT
);