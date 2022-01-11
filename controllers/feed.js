const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getPosts = (req, res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch (err => {
        console.log(err);
        res.status(400).json({message: "Fetching posts error"})
    })
}

exports.getPost = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({message: "Fetch error", error: err});
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
        const contentLink = file.path.slice(13).replace(/\\/g, '/');
        const type = file.mimetype;
        const newPost = new Post({type, category, title, contentLink, description});
        await newPost.save()
        return res.json({message: "A new post was created successfully"})
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Post creation error"})
    }  
}