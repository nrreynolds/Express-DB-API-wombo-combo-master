-- Drop all tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;

-- create users table
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  hash VARCHAR(255) NOT NULL,
  admin BOOL DEFAULT FALSE
);

-- create lists table
CREATE TABLE movies(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  plot VARCHAR(1000) NOT NULL,
  img VARCHAR(255) NOT NULL,
  imdbid VARCHAR(50) NOT NULL
);




