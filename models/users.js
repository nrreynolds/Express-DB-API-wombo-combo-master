// set up db and model obj
const db = require('../db');
const Users = {};

// hashing stuff
const bcrypt = require('bcrypt');

// get promise to hash
Users.hash = (password) => {
  return bcrypt
    .hash(password, 10);
}

// get the promise for the hash from the db given a user name
Users.getDBHash = (name) => {
  return db.one('SELECT hash, admin, id FROM users WHERE name=$1', [name])
}

// get promise to check if a name exists
Users.checkName = (name) => {
  return db.oneOrNone('SELECT id FROM users WHERE name=$1', [name]);
}

// get promise to create a user
Users.create = (name, hash) => {

  return db.task(t => {
    // creating a sequence of transaction queries:
    var q1 = t.one('INSERT INTO users (name, hash) VALUES ($1, $2) RETURNING id, admin', [name, hash]);
    var q2 = t.none('UPDATE users SET admin = TRUE WHERE id=1', []);

    // returning a promise that determines a successful transaction:
    return t.batch([q1, q2]);
  });
}

// get promise to set a user as an admin
Users.setAdmin = (id) => {
  return db.one('UPDATE users SET admin = TRUE WHERE id=$1 RETURNING id', [id]);
}

module.exports = Users;