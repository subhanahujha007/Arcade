import React,{ useEffect, useState } from 'react'
import { Button,TextField, Typography } from '@mui/material';

function gettodo(){
  const [todos,settodos]=useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/todos").then((response)=>{
      response.json().then((data)=>settodos(data))
    })
    setInterval(() => {
      fetch("http://localhost:3000/todos").then((response)=>{
      response.json().then((data)=>settodos(data))
    })
    },1000 );
  }, [])
  return todos;
}

const App=()=> {
  const todo=gettodo();
  return (
  <>
<div style={{"display":"flex","flexDirection":"column","gap":"20px"}}>
 
  <TextField id='title' size="medium" label="Write the title" fullWidth="true"  variant="outlined" />
    <TextField variant="outlined" size="medium"  label="description" fullWidth="true" id='des' />

<Button variant="contained" onClick={()=>fetch("http://localhost:3000/todos",{method:"POST",body:JSON.stringify({
   title:document.getElementById("title").value,
   description:document.getElementById("des").value
  }),headers:{
"Content-Type":"application/json"
  }})}> send</Button>
</div>



  {
    todo.map(todos=>{
      return(
        <div style={{"marginLeft":"20px","marginTop":"20px","display":"inline-block","flexWrap":"nowrap"}}>
          <div >
        <Typography variant="h5" >{todos.title}</Typography>
        <Typography variant="h5" >{todos.description}</Typography>
          <Button size="small" variant="contained" onClick={()=>fetch("http://localhost:3000/todos/"+todos.id,{method:"DELETE"})}>delete</Button>
        </div>
        </div>
      )
    })
  }
  </>

  )
}

export default App;

