const {Schema, model, Types} = require('mongoose');

const commentSchema = new Schema({
    text: String,
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Comment', commentSchema)