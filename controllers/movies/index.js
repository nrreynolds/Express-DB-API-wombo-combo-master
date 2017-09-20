const router = require('express').Router();
const controller = require('./controller');

// set up routes
router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;