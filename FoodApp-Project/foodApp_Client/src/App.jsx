import axios from "axios";
import { useEffect, useState } from "react";

const App=()=>{
  const [foodName, setfoodName] = useState(null);
  const [cuisine, setcuisine] = useState(null);
  const [price, setprice] = useState(null);
  const [foodItems, setfoodItems] = useState([]);
  const [newFoodName, setnewFoodName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3030/read").then((res)=>{
      setfoodItems(res.data);
    })
  },([foodItems]))

  const addFoodItem=()=>{
    axios.post("http://localhost:3030/insert",{
      foodName: foodName,
      cuisine: cuisine,
      price: price
    }).then(()=>{
      console.log("successfully added food item")
    })
  };

  const updateFoodItem=(id)=>{
    axios.put(`http://localhost:3030/update/${id}`,{
      newFoodName: newFoodName
    }).then((res)=>{
      console.log(res);
    })
  }

  const deleteFoodItem=(id)=>{
    axios.delete(`http://localhost:3030/delete/${id}`).then((res)=>{
      console.log(res);
    })
  }

  return(
    <div className="App">
      <h1>Food Items</h1>
      <label>Food Name:</label>
      <input type="text" onChange={(e)=>{setfoodName(e.target.value)}}/>
      <label>Cuisine:</label>
      <input type="text" onChange={(e)=>{setcuisine(e.target.value)}}/>
      <label>Price:</label>
      <input type="number" onChange={(e)=>{setprice(e.target.value)}}/>
      <button onClick={addFoodItem}>Add Food Item</button>
      <hr/>
      {foodItems.map((foodItem)=>{
        return(
          <div key={foodItem._id}>
            <h3>Food Name: {foodItem.foodName}</h3>
            <h3>Cuisine: {foodItem.cuisine}</h3>
            <h3>Price: {foodItem.price}</h3>
            <input type="text" placeholder="Enter new name for food to update" onChange={(e)=>{setnewFoodName(e.target.value)}}/>
            <button onClick={()=>{updateFoodItem(foodItem._id)}}>Update</button>
            <button onClick={()=>{deleteFoodItem(foodItem._id)}}>Delete</button>
            <hr/>
          </div>
        )
      })}
    </div>
  )
}

export default App;
