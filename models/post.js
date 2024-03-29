const {Schema, model, Types} = require('mongoose');

const postSchema = new Schema({
    type: String,
    category: String,
    title: String,
    contentLink: String,               
    description: String,
    viewed: Number,
    creator: [
        {
            type: Types.ObjectId, 
            ref: "User"
        }
    ],     
    liked: [
        {
            type: Types.ObjectId, 
            ref: "User"
        }
    ],     
    comments: [
        {
            type: Types.ObjectId,
            ref: "Comment"
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Post', postSchema)