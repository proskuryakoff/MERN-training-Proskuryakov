const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const fs = require("fs");

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
exports.loadVideo = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
    .then(post => {
        let range = req.headers.range;
        if (!range) {
            range = 'bytes=0-'
        } 
        const contentPath = post.contentLink;
        const contentSize = fs.statSync(contentPath).size;
    
        const chunkSize = 1 * 1e+6;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + chunkSize, contentSize -1);
    
        const contentLength = end - start + 1;
    
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${contentSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": post.type
        }
        res.writeHead(206, headers);
        const stream = fs.createReadStream(contentPath, { start, end })
        stream.pipe(res);
        }
    )
    .catch(err => {
        console.log(err);
        res.status(400).json({message: "Fetch error", error: err});
    })
}

exports.likePost = async (req, res) => {
    try{
        const postId = req.params.id;

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Something went wrong!", error: err})
    } 
}