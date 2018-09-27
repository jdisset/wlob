PRAGMA foreign_keys = ON;

CREATE TABLE tasks (
	id INTEGER PRIMARY KEY,
	start_date DATETIME,
	end_date DATETIME,
	status TEXT DEFAULT "running",
	CHECK (status IN ("running","aborted","completed"))
);

CREATE TABLE images (
	name TEXT PRIMARY KEY,
	date_taken DATETIME,
	task_id INTEGER,
	FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE env_data (
	id INTEGER PRIMARY KEY,
	temperature REAL,
	humidity REAL,
	extra REAL,
	date_taken DATETIME
);

CREATE TABLE layers (
	id INTEGER PRIMARY KEY,
	start_date DATETIME,
	end_date DATETIME,
	task_id INTEGER,
	FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE paths (
	id INTEGER PRIMARY KEY,
	start_date DATETIME,
	end_date DATETIME,
	biomaterial_ref TEXT,
	task_id INTEGER,
	FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);








