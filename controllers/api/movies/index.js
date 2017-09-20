const router = require('express').Router();
const controller = require('./controller');

// set up routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);


module.exports = router;