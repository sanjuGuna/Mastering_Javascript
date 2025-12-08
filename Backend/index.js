const express=require('express');
const app=express();
// const port=3000;
require('dotenv').config(); //To config dotenv
app.get('/',(req,res)=>{
    res.send("hello, World!");
});

app.get('/users/:id/profile',(req,res)=>{
    const userId=req.params.id; //:id that changes dynamically
    const name=req.query.name;
    const age=req.query.age;
    res.send(`User id is ${userId}- Name: ${name}- Age: ${age}`);
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running or path http://localhost:${process.env.PORT}`);
});