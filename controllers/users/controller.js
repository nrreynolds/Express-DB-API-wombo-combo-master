// require the model
const Users = require('../../models/users');
const bcrypt = require('bcrypt');
// set up the controller
const controller = {};

// for logging in
controller.login = (req, res) => {
  // get user data
  const userData = {
      name: req.body.username,
      password: req.body.password
    }
    // get the promise for the hash from the db
  Users.getDBHash(userData.name)
    .then(data => {
      // if it doesn't exist
      if (!data) {
        // redirect to login
        res.redirect('/');
        // if it does exist
      } else {
        bcrypt
        // compare the password with the hash
          .compare(userData.password, data.hash)
          .then(result => {
            // if it matches
            if (result) {
              // clear and set cookies
              res.clearCookie('name');
              res.clearCookie('id');
              res.clearCookie('admin');
              res.cookie('name', userData.name);
              res.cookie('id', data.id);
              res.cookie('admin', data.admin);
              // send to movies
              res.redirect('/movies');
              // if it doesn't match
            } else {
              // send back to log in
              res.redirect('/');
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}


// to sign up
controller.create = (req, res) => {
  // get user data
  const userData = {
    name: req.body.username,
    password: req.body.password
  }
  Users
  // get promise to check if user exists
    .checkName(userData.name)
    .then(data => {
      // if the user doesn't exist
      if (!data) {
        Users
        // hash the password
          .hash(userData.password)
          .then(hash => {
            Users
            // get the promise to create the user
              .create(userData.name, hash)
              .then(data => {
                console.log(data);
                // clear and set cookies
                res.clearCookie('name');
                res.clearCookie('id');
                res.clearCookie('admin');
                res.cookie('name', userData.name);
                res.cookie('id', data[0].id);
                res.cookie('admin', data[0].admin);
                // send to movies
                res.redirect('/movies');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        // if the user exists
      } else {
        // send to login
        res.redirect('/');
      }
    })
    .catch(err => console.log(err));
}

// to log out
controller.logout = (req, res) => {
  // clear cookies
  res.clearCookie('name');
  res.clearCookie('id');
  res.clearCookie('admin');
  // send to login page
  res.redirect('/');
}



module.exports = controller;