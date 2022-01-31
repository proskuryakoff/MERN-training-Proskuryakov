const Post = require('../models/post');
const User = require('../models/user');
const Playlist = require('../models/playlists');
const { validationResult } = require('express-validator');

exports.getPlaylists = (req, res) => {
    const userId = req.user.id;
    User.findById(userId).populate('playlists')
    .then(user => {
        res.status(200).json(user.playlists);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({message: "Fetching playlists error", error: err})
    })
}