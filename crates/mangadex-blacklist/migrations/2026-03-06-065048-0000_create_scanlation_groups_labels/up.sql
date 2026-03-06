-- Your SQL goes here
create table scanlation_groups_labels(
	scanlation_group BLOB NOT NULL references scanlation_groups(group_id),
	label BLOB NOT NULL references labels(label_id),
	create_date DATETIME default datetime,
	notes TEXT,
	PRIMARY KEY (scanlation_group, label)
);