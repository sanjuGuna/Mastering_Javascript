require('dotenv').config();
const mongoose=require('mongoose');
const url=process.env.MONGODB_URL;
mongoose.connect(url)
.then(()=>{
    console.log("Connected to MongoDB successfully");
});