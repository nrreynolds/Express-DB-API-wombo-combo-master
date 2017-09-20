// set up db and model obj
const db = require('../db');
const Movies = {};

// return promise to get all movies
Movies.findAll = () => {
  return db.manyOrNone(
    'SELECT * FROM movies', []
  );
}

// return promise to get movie by id
Movies.findById = (id) => {
  return db.oneOrNone(
    'SELECT * FROM movies WHERE id=$1', [id]
  );
}

// return promise to create a movie (returning the id)
Movies.create = (name, plot, img, imdb) => {
  return db.one(
    'INSERT INTO movies (name, plot, img, imdbid) VALUES ($1, $2, $3, $4) RETURNING id', [name, plot, img, imdb]
  );
}

// return promise to update a movie, (returning the id)
Movies.update = (id, name, plot, img) => {
  return db.one(
    'UPDATE movies SET name = $1, plot = $2, img = $3 WHERE id=$4 RETURNING id', [name, plot, img, id]
  );
}

// return promise to delete a movie
Movies.delete = (id) => {
  return db.none(
    'DELETE FROM movies WHERE id=$1', [id]
  );
}

module.exports = Movies;