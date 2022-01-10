const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const { route } = require('express/lib/application');
const controller = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/register', [
    check('email', 'Email should not be empty').notEmpty(),
    check('email', 'Email is incorrect').isEmail(),
    check('password', 'Minimum length of password is 5 symbols').isLength({min: 5})
], controller.register)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']),controller.getUsers)

module.exports = router;  