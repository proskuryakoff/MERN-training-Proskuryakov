const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

// /api/auth
router.post('/register',
    [
        check('email', 'Email is incorrect').isEmail(),
        check('password', 'Minimum length of password is 5 symbols').isLength({min: 5})
    ], 
    async (req, res) => {
    try{
        console.log(req.body);
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()){
            return res.status(400).json({
                errors: validationErrors.array(),
                message: 'Registration data is incorrect!'
            })
        }
        
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate){
            res.status(400).json({message: 'This user exists already'})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User ({email, password: hashedPassword});

        await user.save();
        res.status(201).json({message: 'User was created'})
    }
    catch(err){
        res.status(500).json({message: 'Something is wrong!'})
    }
})

router.post('/login', 
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check('password', 'Please enter password').exists()
    ],
    async (req, res) => {
    try{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()){
            return res.status(400).json({
                errors: validationErrors.array(),
                message: 'Login data is incorrect!'
            })
        }
        
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ message: 'User is not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Password is incorrect. Try again'})
        }

        const token = jwt.sign(
            { userId: user.id },
            'SecretSecretSecret!',
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id})

    }
    catch(err){
        res.status(500).json({message: 'Something is wrong!'})
    }
})

module.exports = router;  