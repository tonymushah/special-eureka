-- Table of blacklisted authors or artists 
create table authors_artists (
	-- author id as stored a blob for "efficiency"
	author_id blob primary key not null,
	-- author name: people might going offline so i might be a good idea to store it here
	author_name text not null,
	-- idk if it is useful to have this but who knows
	insert_time DATETIME default (datetime('locatime'))
);