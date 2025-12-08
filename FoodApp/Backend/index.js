const express=require('express')
const app=express()
const mongoose=require('mongoose');
const Food=require('./models/Food');
const PORT=process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://myAtlasDBUser:sanjay1210@myatlasclusteredu.w2msv.mongodb.net/?appName=myAtlasClusterEDU')