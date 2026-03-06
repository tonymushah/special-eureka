-- Your SQL goes here
create table users_labels(
	user BLOB NOT NULL references users(user_id),
	label BLOB NOT NULL references labels(label_id),
	create_date DATETIME default datetime,
	notes TEXT,
	PRIMARY KEY (user, label)
);