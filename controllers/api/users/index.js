const router = require('express').Router();
const controller = require('./controller');

// set up routes
router.put('/:id', controller.setAdmin);
router.post('/check', controller.checkName);


module.exports = router;