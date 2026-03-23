-- Your SQL goes here
create table authors_labels(
	author BLOB NOT NULL references authors(author_id) on delete cascade,
	label BLOB NOT NULL references labels(label_id) on delete cascade,
	create_date DATETIME default CURRENT_TIMESTAMP,
	notes TEXT,
	PRIMARY KEY (author, label)
);