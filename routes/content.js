const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/content');
const fileMiddleware = require('../middleware/fileMiddleware')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/:id/get', controller.getPost);
router.get('/:id', controller.loadVideo);

// router.post('/:id/:action', authMiddleware, controller.userPostUpdate)

// router.put('/:id/', [
//     roleMiddleware(['ADMIN']),
//     fileMiddleware.single('content'),
//     check('title', 'Title should not be empty').notEmpty(),
//     check('description', 'Description should not be empty').notEmpty(),
// ], controller.adminPostUpdate)

// router.delete('/:id/', roleMiddleware(['ADMIN']), controller.deletePost)

module.exports = router;