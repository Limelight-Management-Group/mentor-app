DROP DATABASE IF EXISTS mentor_app;

CREATE DATABASE mentor_app;

\c mentor_app


DROP TABLE IF EXISTS mentors;
CREATE TABLE Mentors(
id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL,
password TEXT,
education TEXT,
career_path TEXT,
f_name TEXT,
l_name TEXT,
image TEXT,
email TEXT,
age INTEGER,
location TEXT,
mos TEXT,
branch TEXT,
bio TEXT,
veteran BOOLEAN,
personal_interest TEXT
);
DROP TABLE IF EXISTS mentees;
CREATE TABLE Mentees (

id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL,
password TEXT,
education text,
career_path text,
f_name text,
l_name text,
image text,
email text,
age integer,
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



