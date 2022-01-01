const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getPosts = async (req, res) => {
    try{
        Post.find()
        .then(posts => {
            res.status(200).json(posts);
          })
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Fetching posts error"})
    }  
}

exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try{
        Post.findById(postId)
        .then(post => {
            res.status(200).json(post);
          })
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Error of fetching current post"})
    }  
}

exports.createPost = async (req, res) => {
    try{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()){
            return res.status(400).json({message: "Post creation error", errors: validationErrors.array()})
        }
        const {title, content} = req.body;
        const newPost = new Post({title, content});
        await newPost.save()
        return res.json({message: "A new post was created successfully"})
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Post creation error"})
    }  
}