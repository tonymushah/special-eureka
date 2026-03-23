-- Your SQL goes here
create table scanlation_groups_labels(
	scanlation_group BLOB NOT NULL references scanlation_groups(group_id) on delete cascade,
	label BLOB NOT NULL references labels(label_id) on delete cascade,
	create_date DATETIME default CURRENT_TIMESTAMP,
	notes TEXT,
	PRIMARY KEY (scanlation_group, label)
);