const {Schema, model, Types} = require('mongoose');

const playlistSchema = new Schema({
    name: String, 
    content: [
        {
            type: Types.ObjectId, 
            ref: 'Post'
        }
    ]
})

module.exports = model('Playlist', playlistSchema)