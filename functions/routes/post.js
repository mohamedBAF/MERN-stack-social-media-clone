const express = require('express')
const mongoose=require('mongoose')
const router=express.Router()
const requireLogin=require('../middelware/requireLogin')

const Post=mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    //hethom ki trefreshi state fel front yelzm thothom bch t3awed trecuperihome : heya ki jointure fel mongo bch te5ou nom mt3 l id eli fel posted by

    
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    //
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})



router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body 
    console.log(title,body,pic)
    if(!title || !body || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{new:true}
    )
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{new:true}
    )
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{new:true}
    ).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    
    
    
    
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})



module.exports=router