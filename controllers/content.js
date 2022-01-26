const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comments')
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require("fs");

exports.getPost = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId).populate('comments')
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

exports.adminPostUpdate = async (req, res) => {
    const postId = req.params.id;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({message: "Entered data is incorrect!", errors: validationErrors.array()})
    }
    const category = req.body.category;
    const title = req.body.title;
    const description = req.body.description;
    let type = req.body.type;
    let contentLink = req.body.contentLink;
    if (req.file) {
        contentLink = req.file.path;
        type = req.file.mimetype;
    }
    if (!contentLink) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Post.findById(postId).populate('comments')
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.user.id) {
        const error = new Error('You have no permission to update this post!');
        error.statusCode = 403;
        throw error;
      }
      if (contentLink !== post.contentLink) {
        clearFile(post.contentLink);
      }
      post.type = type;
      post.category = category;
      post.title = title;
      post.contentLink = contentLink;
      post.description = description;
      return post.save();
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

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    const commentsArr = [];
    Post.findById(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
          }
          if (post.creator.toString() !== req.user.id) {
            const error = new Error('You have no permission to delete this post!');
            error.statusCode = 403;
            throw error;
          }
          clearFile(post.contentLink);
          return Post.findByIdAndRemove(postId);
    })
    .then(result => {
        return User.findById(req.user.id);
      })
      .then(user => {
        user.liked.pull(postId);
        return user.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Deleted post.' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
      });
}
exports.userPostUpdate = async (req, res) => {
  const postId = req.params.id;
    if (req.params.action === 'like'){
      User.findById(req.user.id) 
      .then(user => {
        if (user.liked.includes(postId.toString())){
          user.liked.pull(postId.toString());
        } else {
          user.liked.push(postId.toString());
        }
        return user.save();
      })
      Post.findById(postId).populate('comments')
      .then(post => {
          if (!post) {
              const error = new Error('Could not find post.');
              error.statusCode = 404;
              throw error;
            }
        if(post.liked.includes(req.user.id.toString())) {
          post.liked.pull(req.user.id.toString());
        }
        else {
          post.liked.push(req.user.id.toString());
        }
        return post.save() 
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
    if (req.params.action === 'comment') {
      const text = req.body.comment;
      const authorId = req.user.id;
      const authorName = req.user.username;
      const newComment = new Comment({
        text: text,
        author: {
          id: authorId,
          name: authorName
        }
      });
      await newComment.save()
      Post.findById(postId)
      .then(post => {
          if (!post) {
              const error = new Error('Could not find post.');
              error.statusCode = 404;
              throw error;
            }
        post.comments.push(newComment.id);
        return post.save() 
      })
      .then(result => {
        return Post.findById(postId).populate('comments')
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
}

exports.updateViewsAmount = async (req, res) => {
  const postId = req.params.id;
  Post.findById(postId) 
  .then(post => {
    if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
  post.viewed++;
  return post.save() 
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
}

const clearFile = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };
