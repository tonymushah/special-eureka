-- Your SQL goes here
create table authors_labels(
	author BLOB NOT NULL references authors(author_id),
	label BLOB NOT NULL references labels(label_id),
	create_date DATETIME default datetime,
	notes TEXT,
	PRIMARY KEY (author, label)
);