const express=require('express')
const app=express()
require('dotenv').config(); //To config dotenv
const mongoose=require('mongoose');
const Food=require('./models/Food');
const PORT=process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true});

