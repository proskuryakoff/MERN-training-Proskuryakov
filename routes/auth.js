const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/register', [
    check('email', 'Email should not be empty').notEmpty(),
    check('email', 'Email is incorrect').isEmail(),
    check('username', 'Username length must be between 4 and 15 symbols').isLength({min: 4, max: 15}),
    check('password', 'Minimum length of password is 5 symbols').isLength({min: 5})
], controller.register)
router.post('/login', controller.login)
router.get('/users', [authMiddleware, roleMiddleware(['ADMIN'])],controller.getUsers)
router.put('/users/:id', [
    authMiddleware, 
    roleMiddleware(['ADMIN']),  
    check('username', 'Username should not be empty').notEmpty(),
    check('roles', 'Roles should not be empty').notEmpty()
],controller.updateUser)
router.delete('/users/:id', [authMiddleware, roleMiddleware(['ADMIN'])], controller.deleteUser)
module.exports = router;  