const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/feed');
const fileMiddleware = require('../middleware/fileMiddleware')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/content/:id/get', controller.getPost);
router.get('/content/:id', controller.loadVideo);

router.get('/', controller.getPosts);

router.post('/', [
    roleMiddleware(['ADMIN']),
    fileMiddleware.single('content'),
    check('title', 'Title should not be empty').notEmpty(),
    check('description', 'Description should not be empty').notEmpty(),
], 
controller.createPost);

module.exports = router;