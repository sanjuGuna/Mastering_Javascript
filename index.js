import express from 'express';
import multer from 'multer';

const app=express();
const upload=multer();

app.use(express.urlencoded({extended:true}));
// app.use(express.json());
app.use(upload.single('image'));
app.post('/form', (req,res)=>{
    console.log(req.body);
    const {name,email,age}=req.body;
    if(!name || !email || !age){
        return res.status(400).send({message:"bad request"});
    }
    return res.status(201).send({message:"user data received",
        data:req.body
    })
});

//COOKIES MANAGEMENT
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});