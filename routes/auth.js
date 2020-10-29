const express = require('express')
const { response, json } = require('express')
const mongoose=require('mongoose')
const router=express.Router()
const User=mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../Keys')
const requireLogin=require('../middelware/requireLogin')




router

router.get('/protected',requireLogin,(req,rep)=>{
rep.send("hello")

})


router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
   return   res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then(

     (savedUser)=>{
         if(savedUser){
            res.status(422).json({error:"please the user is alredy exist"})
        }
        bcrypt.hash(password,12)
        .then(hashpassword=>{
            const user=new User({
                name,
                email,
                password:hashpassword
            })
            user.save().then(
                user=>{
                    res.json({message:"successfuly added"})
                })
                .catch(
                err=>{
                    console.log(err)
                }
            )
    
        }
        )
        .catch(
            err=>{
                console.log(err)
            }
        )
        })
        
    })

    router.post('/signin',(req,res)=>{

        const {email,password}=req.body
        if(!email || !password){
       return   res.status(422).json({error:"please add email and password"})
        }
        User.findOne({email:email}).then(
    
         (savedUser)=>{
             if(!savedUser){
               return  res.status(422).json({error:"invalid email and password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if (doMatch){
                    //return res.json({message:"suucessfuly signin"})
const token=jwt.sign({_id:savedUser._id},JWT_SECRET)

const{_id,name,email}=savedUser
res.json({token,user:{_id,name,email}})
                }
                else{
                    return res.status(422).json({error:"invalid email or password"})
                    
                }

            })
            .catch(
                err=>{
                    console.log(err)
                })
 })
    

})
module.exports=router