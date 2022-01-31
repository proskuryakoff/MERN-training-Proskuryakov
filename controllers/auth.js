const User = require('../models/user');
const Role = require('../models/Role');
const Comment = require('../models/comments')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const generateAccessToken = (id, username, roles, playlists) => {
    const payload = {
        id,
        username,
        roles, 
        playlists
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
            const token = generateAccessToken(user._id, username, user.roles, user.playlists);
            const expiresIn = 3600;
            return res.json({message: "User was created successfully", token, userId, roles, username, expiresIn})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Registration error", error: err})
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
            const token = generateAccessToken(user._id, username, user.roles, user.playlists);
            const expiresIn = 3600;
            return res.json({message: "Logged in successfully", token, userId, roles, username, expiresIn})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Login error", error: err})
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

    async updateUser(req, res) {
        const userId = req.params.id;
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({message: "Entered data is incorrect!", errors: validationErrors.array()})
        }
        const username = req.body.username;
        const roles = req.body.roles;
        User.findById(userId)
        .then(user => {
          if (!user) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
          }
          user.username = username;
          user.roles = [];
          user.roles.push(roles);
          return user.save();
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
        });
    }
    async deleteUser(req, res) {
        const userId = req.params.id;
        User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(400).json({message: 'User is not found'})
              }
              return User.findByIdAndRemove(userId);
        })
          .then(result => {
            res.status(200).json({ message: 'Deleted user.' });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
          });
    }
}

module.exports = new authController()