// require the model
const Movies = require('../../models/movies');
// set up the controller
const controller = {};

// for index of movies
controller.index = (req, res) => {
  // check if logged in
  const loggedin = req.cookies.id ? true : false;
  if (loggedin) {
    // check if admin
    const admin = req.cookies.admin;
    Movies
    // get promise
      .findAll()
      .then(data => {
        // if admin
        if (admin === 'true') {
          // render the admin page
          res.render('admin/index', {
            movies: data
          });
          // otherwise
        } else {
          // render the guest page
          res.render('movies/index', {
            movies: data
          });
        }
      })
      .catch(err => console.log('ERROR:', err));
    // if not logged in
  } else {
    // send to login page
    res.redirect('/');
  }
}

// to show info on a movie
controller.show = (req, res) => {
  // get if logged in
  const loggedin = req.cookies.id ? true : false;
  // if they are
  if (loggedin) {
    // get admin
    const admin = req.cookies.admin;
    // get id
    const id = req.params.id;
    Movies
    // get promise
      .findById(id)
      .then(data => {
        // if they are an admin
        if (admin === 'true') {
          // render the admin page
          res.render('admin/show', {
              movie: data
            })
            //otherwise
        } else {
          // render the guest page
          res.render('movies/show', {
            movie: data
          });
        }
      })
      .catch(err => console.log('ERROR:', err));
    // if not logged in
  } else {
    // go to login page
    res.redirect('/');
  }

}

module.exports = controller;