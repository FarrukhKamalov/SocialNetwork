const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        min: 2,
        max: 26
    },
    Email : {
        type:String,
        required: true,
        min: 7,
        max: 26
    },
    Password: {
        type: String,
        required: true,
        min: 6,
        max: 26
    },
    image: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png'
    }
});




module.exports = mongoose.model('User', UserSchema);
