const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
    role: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    username: String,
    playlists: [{type: Types.ObjectId, ref: 'Playlist'}],       //fix
    liked: [{type: Types.ObjectId}]     //fix
})

module.exports = model('User', userSchema)