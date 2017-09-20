// set up router
const router = require('express').Router();

// routes!
// api
router.use('/api/', require('./controllers/api/'));
// home
router.get('/', (req, res) => {
  res.render('index');
});
// movies
router.use('/movies/', require('./controllers/movies/'));
// users
router.use('/users/', require('./controllers/users/'));


module.exports = router;