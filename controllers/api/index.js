const router = require('express').Router();

// set api routes
router.use('/movies/', require('./movies/'));
router.use('/users/', require('./users/'));

// any gets here don't exist... redirect
router.get('*', (req, res) => {
  res.redirect('/');
})

module.exports = router;