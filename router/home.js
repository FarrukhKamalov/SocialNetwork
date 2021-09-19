const router = require("express").Router();
const verify = require('../verifytoken');
const Post = require('../models/post');
const cloudinary = require('cloudinary');
router.get('/home', verify, async(req, res) => {
    await Post.find({})
    .populate("PostedBy")
    .sort({createdAt: -1})
    .then(result => {
        res.render('home', {result});
     }).catch((err)=>{
          res.send(err)
     });
});

router.post('/postsave', verify, (req, res) => {
        cloudinary.uploader.upload(req.files.img.tempFilePath)
        .then((result) => {
             const newPost =  new Post({
                PostedBy: req.user,
                title: req.body.title,
                desc: req.body.desc,
                img: result.secure_url
            })
            Post.create(newPost).then((result) =>  {res.redirect('/home')}).catch((err)=>{
                console.log(err)
            })
            
        }).catch((error) => {
            res.status(500).send({
            message: "failure",
            error,
         });
        });

   
});

router.get('/search', async(req, res)=>{
    const regexQuery = {
        title: new RegExp(req.query.search, 'i')
    }
    await Post.find({"title":regexQuery.title}).populate('PostedBy').then((result)=>{
        res.render('search', {result, regexQuery})
    }).catch((err)=>{
        console.log(err);
    })
});

router.get('/me', verify, async(req, res) => {
    const id = req.user._id;
  await  Post.find({PostedBy: id}).populate('PostedBy').then(result =>{
        res.render('profile', {result});
    }).catch(err => {
        console.log(err)
    })
});
router.get('/me/delete/:id', (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
    .then((result) => {
         res.redirect('/me');
    }).catch((err)=>{
        console.log(err)
         res.redirect('/me');
    })
});
module.exports = router;
