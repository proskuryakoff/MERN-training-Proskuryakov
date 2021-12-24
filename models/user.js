const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
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
    roles: [{
        type: String, 
        ref: 'Role'
    }],
    playlists: [{type: Types.ObjectId, ref: 'Playlist'}],       //fix
    liked: [{type: Types.ObjectId}]     //fix
})

module.exports = model('User', userSchema)