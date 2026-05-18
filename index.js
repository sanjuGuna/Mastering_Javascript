import express from 'express';
import multer from 'multer';
import cookie from 'cookie';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app=express();
const upload=multer();
const users=[];
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(upload.single('image'));

//Session
app.use(session({
    secret:"sample-secret",
    resave:false,
    saveUninitialized:false
}))

app.get("/visit",(req,res)=>{
    if(req.session.page_views){
        req.session.page_views++;
        return res.send(`You visited this ${req.session.page_views} times`);
    }else{
        req.session.page_views=1;
        return res.send("Welcome to this page!!");
    }
})

//register
app.post("/register", (req,res)=>{
    const {userName, password}=req.body;
    if(!userName || !password){
        return res.status(400).send({message:"bad request"});
    }
    users.push({userName,password});
    return res.send({message:"user registered successfully"});
});

//login
app.post("/login",  (req,res)=>{
    const {userName, password}=req.body;
    const userIndex=users.findIndex((u)=>u.userName===userName);

    if(!userName || !password){
        return res.status(400).send({message:"bad request"});
    }
    if(userIndex===-1){
        return res.status(404).send({message:"user not found"});
    }
    const user=users[userIndex];
    if(!user || user.password!==password){
        return res.send({message:"Not authorized"});
    }
    req.session.user=user;
    return res.send({message:"user logged in"});
});

app.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.send({message:"user unauthorized"});
    }
    return res.send({message:`Welcome ${req.session.user.userName}`});
})
app.get("/",(req,res)=>{
    res.cookie('name','value-',{maxAge:120000});
    res.send("hello!! this is from server");
})

// app.get("/fetch",(req,res)=>{
//     console.log(req.cookies);
//     return res.send({message:"cookie fetched"})
// })
app.post('/form', (req,res)=>{
    console.log(req.body);
    console.log(req.cookie);
    const {name,email,age}=req.body;
    if(!name || !email || !age){
        return res.status(400).send({message:"bad request"});
    }
    return res.status(201).send({message:"user data received",
        data:req.body
    })
});


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});