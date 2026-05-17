const express=require('express');
const app=express();
const path="https://jsonplaceholder.typicode.com/users"

const userss = [
    { id: 1, name: "Alice", role: "admin", location: "New York" },
    { id: 2, name: "Bob", role: "user", location: "London" },
    { id: 3, name: "Charlie", role: "admin", location: "London" },
    { id: 4, name: "David", role: "user", location: "Paris" },
    { id: 5, name: "undefined", role: "admin", location: "India"}
];
app.use(express.json());
app.use('/',(req, res, next)=>{
    console.log(req.path);
    console.log(req.host);
    next();
});

app.get('/',(req,res)=>{
    res.json({message:"hello from server GET from root endpoint"});
});

app.get("/api/users",async (req,res)=>{
    const response=await fetch(path)
                    .then(data=>data.json())
    res.send(response);
});

app.get("/api/test/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).send({ message: "bad request: ID must be a number" });
    }

    res.send({message:"success",
        id:id
    })
});
app.get("/api/test/users", (req, res) => {
    return res.send(userss);
});

app.get("/api/test/users", (req, res) => {
    // const {query:{filter,value}}=req;
    const {filter,value}=req.query;;
    if(filter && value){
        return res.send(userss.filter(((u)=>u[filter].includes(value))));
    }
    res.send(userss);
    
});


app.get("/api/users/:id",async (req,res)=>{

    const response=await fetch(`${path}/${req.params.id}`)
                    .then(data=>data.json());
    res.send(response);
})

app.post("/api/test/users",(req,res)=>{
    console.log(req.body);
    const {name, role, location}=req.body;
    if(!name || !role || !location){
        return res.status(400).json({message : "Bad Request: Missing required fields"})
    }
    const newId=userss.length>0 ? userss[userss.length-1].id+1:1;
    const newUser={id:newId,name,role,location};
    userss.push(newUser);

    return res.status(201).json({
        message:"user data received",
        receiveddata:req.body
    })
})

app.put("/api/test/users/:id",(req,res)=>{
    console.log(req);
    const userId=parseInt(req.params.id);
    if(isNaN(userId)){
        return res.status(400).send({message:"bad request sent"})
    }

    const userIndex=userss.findIndex((user)=>user.id===userId);
    if(userIndex===-1){
        return res.status(404).send({message:"user not found"})
    }

    const {body}=req;
    userss[userIndex]={id : userId,...body};
    return res.status(200).send({message:"name is updated"});
    
})

app.delete("/api/test/users/:id",(req,res)=>{
    const userId=parseInt(req.params.id);
    const userIndex=userss.findIndex((user)=>user.id===userId);
    userss.splice(userIndex,1);
    return res.send({message:"successfully deleted"});
})

app.patch("/api/test/users/:id",(req,res)=>{
    const userId=parseInt(req.params.id);
    if(isNaN(userId)){
        return res.status(400).send({message:"bad request sent"})
    }
    const userIndex=userss.findIndex((user)=>user.id===userId);
    if(userIndex===-1){
        return res.status(404).send({message:"user not found"});
    }

    const {body}=req;
    userss[userIndex]={...userss[userIndex],...body};
    return res.status(200).send({message:"patch update successful"});
})
// app.get("/api/users?filter")
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
})
