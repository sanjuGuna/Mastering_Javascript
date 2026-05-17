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


// app.get("/api/users?filter")
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
})
