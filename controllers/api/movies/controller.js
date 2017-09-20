// require the model
const Movies = require('../../../models/movies');
// set up the controller
const controller = {};

// to get all movies
controller.index = (req, res) => {
  Movies
  // get promise
    .findAll()
    .then(data => {
      // send json
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
}

// to show one movie
controller.show = (req, res) => {
  //get id
  const id = req.params.id;
  Movies
  // get promise
    .findById(id)
    .then(data => {
      // send json
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
}

// to create a movie
controller.create = (req, res) => {
  // get the movie data
  const newData = {
    name: req.body.name,
    img: req.body.img,
    plot: req.body.plot,
    imdb: req.body.imdb
  }
  Movies
  // get promise
    .create(newData.name, newData.plot, newData.img, newData.imdb)
    .then(data => {
      // send json
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
}

// to update a movie
controller.update = (req, res) => {
  // get movie data
  const updateData = {
    id: req.params.id,
    name: req.body.name,
    plot: req.body.plot,
    img: req.body.img
  }
  Movies
  // get promise
    .update(updateData.id, updateData.name, updateData.plot, updateData.img)
    .then(data => {
      // send json
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
}

controller.delete = (req, res) => {
  // get id
  const id = req.params.id;
  Movies
  // get promise
    .delete(id)
    .then(data => {
      // send json
      res.send('Movie Deleted');
    })
    .catch(err => console.log('ERROR:', err));
}

module.exports = controller;