const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    PostedBy:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    title:{
        type: String,
        max:120
    },
    desc: {
        type: String,
        max: 760
    },
    img:{
        type: String,
        default: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
    }
 
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema);