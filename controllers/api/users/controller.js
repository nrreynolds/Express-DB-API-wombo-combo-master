// require the model
const Users = require('../../../models/users');
const bcrypt = require('bcrypt');
// set up the controller
const controller = {};

// to check if a name exists
controller.checkName = (req, res) => {
  // get the name
  const name = req.body.name;
  Users
  // get promise
    .checkName(name)
    .then(data => {
      // send json
      req.json(data);
    })
    .catch(err => console.log(err));
}


// to set as admin
controller.setAdmin = (req, res) => {
  // get id
  const id = req.params.id;
  Users
  //get promise
    .setAdmin(id)
    .then(data => {
      // send json
      res.json(data);
    })
    .catch(err => console.log(err));
}




module.exports = controller;