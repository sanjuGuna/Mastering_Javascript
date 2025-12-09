const express=require('express')
const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json());
require('dotenv').config(); //To config dotenv

const mongoose=require('mongoose');
const FoodModel=require('./models/Food');

const PORT=process.env.PORT || 3030;
try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully");
}catch(err){
    console.log("Error connecting database",err)
}


app.post('/insert',async(req,res)=>{
    const foodName=req.body.foodName;
    const cuisine=req.body.cuisine;
    const price=req.body.price;
    const food=new FoodModel({foodName: foodName,
                                cuisine: cuisine,
                                price: price
    });
    try{
        await food.save();
        res.status(200).send("Food item save successfully")
    }catch(err){
        res.status(500).send("Error in inserting the food item");
    }
});

app.get('/read',async (req,res)=>{
    try{
        const foodItems=await FoodModel.find({});
        res.status(200).json(foodItems);
    }catch(err){
        res.status(500).send("Error in fetching the food items");
    }
})

app.put('/update/:id',async(req,res)=>{
    const newFoodName=req.body.newFoodName;
    const id=req.params.id;
    try{
        await FoodModel.findByIdAndUpdate(id, {foodName: newFoodName},{new: true})
        res.status(200).send("updating the foodItem is successfull")

    }catch(err){
        res.status(500).send("Error updating the foodItem")
    }
});

app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await FoodModel.findByIdAndRemove(id);
        res.status(200).send("Food item deleted successfully");
    }catch(err){
        res.status(500).send("Error deleting the foodItem")

    }
});
app.listen(PORT,()=>{
    console.log(`server is running or path http://localhost:${process.env.PORT}`);
})