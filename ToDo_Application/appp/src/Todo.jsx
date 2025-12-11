import axios from "axios";
import {useState,useEffect} from 'react';

const Todo=()=>{
    const [title,setTitle]=useState(null);
    const [description,setDescription]=useState(null);
    const [status,setStatus]=useState(false);
    const [tasks,setTasks]=useState([]);
    const [newSatus,setNewStatus]=useState(false);


    const handleInputChange = (event) => {
    const inputValue = event.target.value;
        if (inputValue.toLowerCase() === 'true') {
        setNewStatus(inputValue.toLowerCase() === 'true'); // Converts to boolean
        // Use isTrue in your state update or other logic
        }else{
        setNewStatus(inputValue.toLowerCase() === 'false');
        }
    };
    useEffect(()=>{
        axios.get("http://localhost:3030/readTask").then((res)=>{
            setTasks(res.data);
        })
    },[tasks]);

    const addTask=()=>{
        axios.post("http://localhost:3030/addTask",{
            title: title,
            description: description,
            status: status
        }).then((res)=>{
            console.log("Task added successfully ",res)
        })
    };

    const updateTask=(id)=>{
        axios.put(`http://localhost:3030/updateTask/${id}`,{
            newStatus: newSatus
        }).then((res)=>{
            console.log("Task is updated ",res);
        })
    };

    const deleteTask=(id)=>{
        axios.delete(`http://localhost:3030/deleteTask/${id}`).then((res)=>{
            console.log("Task is deleted ",res);
        })
    };

    return(
        <>
            <div className="todoApp">
                <h2>To-Do tasks</h2>
                <label>Title:</label>
                <input type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
                <label>Description:</label>
                <input type="text" onChange={(e)=>{setDescription(e.target.value)}}/>
                <label>Status</label>
                <input type="text" onChange={(e)=>{setStatus(e.target.value)}}/>
                <button onClick={addTask}>Add Task</button>
                <hr/>
                {tasks.map((task)=>{
                    return(
                        <div key={task._id}>
                            <h3>Title: {task.title}</h3>
                            <h3>Description: {task.description}</h3>
                            <h3>Status: {task.status.toString()}</h3>
                            <input type="text" placeholder="Enter the new status to update" onChange={(e)=>{handleInputChange(e)}}/>
                            <button onClick={()=>{updateTask(task._id)}}>Update</button>
                            <button onClick={()=>{deleteTask(task._id)}}>Delete</button>
                            <hr/>
                        </div>
                        
                    )
                })}
            </div>
        </>
    )
}

export default Todo;