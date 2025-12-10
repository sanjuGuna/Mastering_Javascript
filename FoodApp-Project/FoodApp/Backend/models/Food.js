const mongoose=require('mongoose');
const FoodSchema=new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

const Foody=mongoose.model('Food_data',FoodSchema);

module.exports=Foody;