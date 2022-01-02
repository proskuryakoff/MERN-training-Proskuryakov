const {Schema, model, Types} = require('mongoose');

const postSchema = new Schema({
    title: String,
    content: String,                    // fix
    description: String,
    category: String,
    viewed: Number,
    liked: [{type: Types.ObjectId}],     // fix
    comments: [
        {
            type: Types.ObjectId,
            ref: "comments"
        }
    ],
    created: {                           // fix
        type: Date,
        default: Date.now
    }
})

module.exports = model('Post', postSchema)