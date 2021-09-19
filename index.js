const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const  cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const verify = require('./verifytoken');
const Post = require('./models/post')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Mongodb')).catch((err)=> console.error(err))


app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));
app.use(express.static('./static'));
app.set('view engine', 'ejs');


cloudinary.config({
    cloud_name :'file-upload',
    api_key:'731456294949825',
    api_secret:'FBVBUiPRE6xJmS_pEWWxjIhYMWU' 
});

app.use('/auth/', require('./router/auth'));
// app.use('/profile', require(''));
app.use('/', require('./router/home'));




app.use((req , res, next)=>{

    res.redirect('/auth/signup');

})

const PORT = process.env.PORT || 5000
app.listen(PORT , ()=> console.log('> Server is up and running on port : ' + PORT))