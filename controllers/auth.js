const User = require('../models/user');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        {expiresIn: "1h"}
    )
}

class authController {
    async register (req, res) {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()){
                return res.status(400).json({message: "Registration error (validation)", errors: validationErrors.array()})
            }
            const {email, password, username} = req.body
            const candidate = await User.findOne({email})
            if (candidate){
                return res.status(400).json({message: "User with this email already exists"})
            }
            const hashedPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({email, password: hashedPassword, username, roles: [userRole.value]})
            await user.save()
            const userId = user._id;
            const roles = user.roles;
            const token = generateAccessToken(user._id, user.roles);
            const expiresIn = 3600;
            return res.json({message: "User was created successfully", token, userId, roles, username, expiresIn})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Registration error"})
        }
    }

    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json({message: 'User is not found'})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: "Password is incorrect"})
            }
            const userId = user._id;
            const roles = user.roles;
            const username = user.username;
            const token = generateAccessToken(userId, roles);
            const expiresIn = 3600;
            return res.json({message: "Logged in successfully", token, userId, roles, username, expiresIn})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            console.log(err);

        }
    }
}

module.exports = new authController()