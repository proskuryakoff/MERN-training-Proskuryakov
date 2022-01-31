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
exports.deletePlaylist = (req, res) => {
    const playlistId = req.params.id;
    const userId = req.user.id;
    User.findById(userId)
    .then(user => {
        if (!user.playlists.includes(playlistId)) {
            res.status(403).json({message: "Delete Error: You don't have this playlist", error: err})
        }
        user.playlists.pull(playlistId)
        return user.save()
    })
    .then(result => {
        Playlist.findByIdAndRemove(playlistId)
    })
    .then(result => {
        res.status(200).json({ message: 'Playlist was deleted' });
      })
    .catch (err => {
        console.log(err);
        res.status(500).json({message: "Fetching playlists error", error: err})
    })
}