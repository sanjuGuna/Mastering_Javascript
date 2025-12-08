const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
require('dotenv').config(); 
const url=process.env.MONGODB_URL;
mongoose.connect(url)
.then(()=>{
    console.log("Connected to MongoDB successfully");
});
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true}
});

const User=mongoose.model('User_data',userSchema);

const new_user= new User({
    username:"sanjay",
    email:"sanjay@gmail.com",
    age:20
});

new_user.save().then((doc)=>{
    console.log("New user saved:",doc);
}).catch((err)=>{
    console.error("Error saving user:",err);
});