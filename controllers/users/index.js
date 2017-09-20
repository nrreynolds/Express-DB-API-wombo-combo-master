const router = require('express').Router();
const controller = require('./controller');

// set routes
router.post('/login', controller.login);
router.post('/signup', controller.create);
router.get('/logout', controller.logout);
// anything else should just go home
router.get('*', (req, res) => {
  res.redirect('/');
})

module.exports = router;