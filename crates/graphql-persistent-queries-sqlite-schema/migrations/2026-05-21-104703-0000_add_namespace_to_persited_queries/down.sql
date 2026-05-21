-- This file should undo anything in `up.sql`
alter table persistent_queries 
	drop column namespace;