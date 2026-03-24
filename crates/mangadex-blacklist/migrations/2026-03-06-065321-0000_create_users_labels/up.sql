-- Your SQL goes here
create table users_labels(
	user BLOB NOT NULL references users(user_id) on delete cascade,
	label BLOB NOT NULL references labels(label_id) on delete cascade,
	create_date DATETIME default CURRENT_TIMESTAMP,
	notes TEXT,
	PRIMARY KEY (user, label)
);