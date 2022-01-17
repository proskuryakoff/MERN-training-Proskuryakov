const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const fs = require("fs");

exports.getPosts = (req, res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({message: "Fetching posts error", error: err})
    })
}

exports.createPost = async (req, res) => {
    try{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()){
            return res.status(400).json({message: "Post creation error", errors: validationErrors.array()})
        }
        const {category, title, description} = req.body;
        const file = req.file;
        const contentLink = file.path;
        const type = file.mimetype;
        const creator = req.user.id;
        const viewed = 0;
        const newPost = new Post({type, category, title, contentLink, description, viewed, creator});
        await newPost.save()
        return res.json({message: "A new post was created successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Post creation error", error: err})
    }  
}
