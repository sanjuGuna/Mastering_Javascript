// App.js
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [food, setFood] = useState([])
  const [updatefood, setUpdateFood] = useState(null)
  const [foodName, setFoodName] = useState('')
  const [cuisine, setCuisine] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchFoodItems();
    }
  }, []);

  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/showfood', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // backend returns { foods: [...] }
      setFood(response.data.foods || []);
    } catch (error) {
      console.error('Error fetching food items:', error);
      setFood([]);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        userName: registerUsername,    // backend expects userName
        password: registerPassword
      });

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      // clear form
      setRegisterUsername('');
      setRegisterPassword('');
      fetchFoodItems();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        userName: loginUsername,   // backend expects userName
        password: loginPassword
      });

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      // clear form
      setLoginUsername('');
      setLoginPassword('');
      fetchFoodItems();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFood([]);
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post(
        'http://localhost:5000/api/food',
        { foodName, cuisine }, // backend expects foodName and cuisine
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFoodName('');
      setCuisine('');
      setUpdateFood(null);
      fetchFoodItems();
    } catch (error) {
      console.error('Adding food item failed:', error);
    }
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    try {
      if (!updatefood || !updatefood._id) return;
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/updatefood/${updatefood._id}`,
        { foodName: updatefood.foodName, cuisine: updatefood.cuisine }, // backend fields
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpdateFood(null);
      fetchFoodItems();
    } catch (error) {
      console.error('Updating food item failed:', error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.delete(
        `http://localhost:5000/api/deletefood/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchFoodItems();
    } catch (error) {
      console.error('Deleting food item failed:', error);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="App">
        <h2>Food Tracker</h2>
        <button onClick={handleLogout}>Logout</button>

        <h2>Add new Food</h2>

        <form onSubmit={handleAddFood}>
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
          <button type="submit">Add Food</button>
        </form>

        <h2>Your Foods</h2>
        <ul>
          {food.map((f) => (
            <li key={f._id}>
              {f.foodName} - {f.cuisine}
              <button onClick={() => setUpdateFood(f)}>Update</button>
              <button onClick={() => handleDeleteFood(f._id)}>Delete</button>
            </li>
          ))}
        </ul>

        {updatefood && (
          <div>
            <h2>Update Food</h2>
            <form onSubmit={handleUpdateFood}>
              <input
                type="text"
                value={updatefood.foodName}
                onChange={(e) => setUpdateFood({ ...updatefood, foodName: e.target.value })}
                required
              />

              <input
                type="text"
                value={updatefood.cuisine}
                onChange={(e) => setUpdateFood({ ...updatefood, cuisine: e.target.value })}
                required
              />

              <button type="submit">Update Food</button>
              <button type="button" onClick={() => setUpdateFood(null)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default App;
