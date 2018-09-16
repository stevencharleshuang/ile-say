DROP DATABASE react_blog;
CREATE DATABASE react_blog;

\c react_blog

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
           id SERIAL PRIMARY KEY,
        fName VARCHAR(50) NOT NULL,
        lName VARCHAR(50) NOT NULL,
     username VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
     password VARCHAR(32) NOT NULL,
   avatar_url TEXT
);
