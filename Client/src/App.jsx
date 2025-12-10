import { useState } from 'react'
import './App.css'
import Home from './Home.jsx';
import Greeting from './Greeting.jsx';
import Counter from './Counter.jsx';
import ButtonUsage from './ButtonUsage.jsx';
function App() {
  const [name,setName]=useState('sanjay')
  return (
    <>
      <h1>Hello {name}</h1>
      <Home />
      <Greeting name={name} />
      <Counter />
    </>
  )
}

export default App
