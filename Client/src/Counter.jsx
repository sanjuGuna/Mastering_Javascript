import { useState } from "react";
import ButtonUsage from "./ButtonUsage.jsx";
const Counter=()=>{
    const [count,setCount]=useState(0);
    return(
        <>
        <ButtonUsage onClick={()=>setCount(count+1)}>Increment</ButtonUsage>
        <ButtonUsage onClick={()=>setCount(count-1)}>Decrement</ButtonUsage>
        <h1>{count}</h1>
        </>
    )
};
export default Counter;