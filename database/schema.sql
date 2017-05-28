-- DROP DATABASE IF EXISTS mentor_app;

-- CREATE DATABASE mentor_app;

-- \c mentor_app


-- DROP TABLE IF EXISTS mentors;
-- CREATE TABLE Mentors(
-- id SERIAL PRIMARY KEY,
-- username VARCHAR(30) NOT NULL,
-- password TEXT,
-- education TEXT,
-- career_path TEXT,
-- f_name TEXT,
-- l_name TEXT,
-- image BYTEA,
-- email TEXT,
-- age INTEGER,
-- location TEXT,
-- mos TEXT,
-- branch TEXT,
-- bio TEXT,
-- veteran BOOLEAN,

-- personal_interest TEXT
-- );
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (

id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL UNIQUE,
password TEXT,
education TEXT,
career_path TEXT,
f_name TEXT,
l_name TEXT,
image BYTEA,
email TEXT,
age integer,
location TEXT,
mos TEXT,
branch TEXT,
mentee BOOLEAN DEFAULT TRUE,
bio TEXT,
personal_interest TEXT,
mentor_id INTEGER
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
id SERIAL PRIMARY KEY,
message TEXT,
sender TEXT
);

-- DROP TABLE IF EXISTS mentorship;
-- CREATE TABLE mentorship(
-- mentors_id INTEGER REFERENCES Users(id),
-- mentees_id INTEGER REFERENCES Users(id)
-- );

DROP TABLE IF EXISTS conversation;
CREATE TABLE conversation(
messages_id INTEGER PRIMARY KEY, 
user_one INTEGER ,
user_two INTEGER ,
FOREIGN KEY (user_one) REFERENCES users(id),
FOREIGN KEY (user_two) REFERENCES users(id)
);




