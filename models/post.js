const {Schema, model, Types} = require('mongoose');

const postSchema = new Schema({
    type: String,
    category: String,
    title: String,
    contentLink: String,               
    description: String,
    viewed: Number,
    liked: [
        {
            type: Types.ObjectId, 
            ref: "User"
        }
    ],     
    comments: [
        {
            type: Types.ObjectId,
            ref: "comments"
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Post', postSchema)