const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/feed');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', controller.getPosts);

router.post('/', [
    check('title', 'Email should not empty').notEmpty(),
    check('content', 'Email is incorrect').notEmpty()
], 
controller.createPost);

module.exports = router;  