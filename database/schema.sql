DROP DATABASE IF EXISTS mentor_app;

CREATE DATABASE mentor_app;

\c mentor_app


DROP TABLE IF EXISTS mentors;
CREATE TABLE Mentors(
id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL,
education TEXT,
career_path TEXT,
f_name TEXT,
l_name TEXT,
image TEXT,
location TEXT,
mos TEXT,
branch TEXT,
bio TEXT,
veteran BOOLEAN,
personal_interest TEXT
);

CREATE TABLE Mentees (

id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL,
education text,
career_path text,
f_name text,
l_name text,
image text,
location text,
mos text,
branch text,
bio text,
personal_interest text,
mentor INTEGER REFERENCES Mentors(id)
);

DROP TABLE IF EXISTS mentorship;
CREATE TABLE mentorship(
mentors_id INTEGER,
mentees_id INTEGER
);



