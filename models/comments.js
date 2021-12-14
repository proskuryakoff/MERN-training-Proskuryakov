const {Schema, model, Types} = require('mongoose');

const commentSchema = new Schema({
    text: String,
    author: {
        id: {
            type: Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Comment', commentSchema)

//fix