import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { 
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   },[])

  const saveTodos= () => { localStorage.setItem("todos",JSON.stringify(todos)) }

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=> i.id === id)

    setTodo(t[0].text)
    inputRef.current.focus()
    let newTodos = todos.filter((item)=>{
      return item.id !== id;
    }
    )
    setTodos(newTodos)
    saveTodos()

  }

  const handleDelete=(e,id)=>{
    let newTodos = todos.filter((item)=>{
      return item.id !== id;
    }
    )
    setTodos(newTodos)
    saveTodos()
  }

  const handleChange=(e)=>{
      setTodo(e.target.value)
  }

  const handleAdd=(e)=>{
    if(todo.length >= 3)
{setTodos([...todos,{ id:uuidv4() , text:todo , isComplete: false}])
saveTodos()
setTodo('')}
  
    
  }
  const toggleFinish = () => { setShowFinished(!showFinished) }

  

  const handleCheckbox=(id)=>{
    // let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isComplete= !newTodos[index].isComplete;
    setTodos(newTodos)
    saveTodos()

   
  }

  const checkComplete = todos.length>0 && todos.every(todo=>todo.isComplete)

   
const handleEnter = (e) => { if(e.key === 'Enter'){handleAdd(e)} }


  return (
    <>
      <div className='w-screen h-screen'>
        <Navbar />
        <div className='flex flex-row justify-center'>
        <div className='justify-center mt-2 rounded-md  bg-yellow-100 w-[600px] h-max shadow-lg mx-2'>
          <div className='flex justify-center mt-5'>
          <input ref={inputRef} onKeyDown={handleEnter} onChange={handleChange} value={todo} className=' shadow appearance-none border rounded w-9/12 py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline focus:outline-none focus:ring-2  focus:border-blue-500 hover:border-blue-500' placeholder='Add some tasks'></input>
          <button onClick={handleAdd} disabled={todo.length<3} className='shadow-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-3 rounded transition-transform transform active:translate-y-1 disabled:bg-gray-400 disabled:translate-y-0' >Add</button>
        </div>
        <div onChange={toggleFinish} className='flex mt-3 font-bold mb-0 text-blue-900 gap-1 items-center mx-5' ><input type="checkbox" name="" id="" checked={showFinished} className=''/>Show Finished</div>
    
        <div className='mt-4 h-max'>
          {todos.length==0 && <div className='text-center mb-3 text-yellow-700 text-opacity-40 font-bold'> No tasks set yet</div>}
        {checkComplete && todos.length>0 && <div className='text-center mb-3 text-yellow-700 text-opacity-40 font-bold'>All Tasks Completed Hurray!!</div> }
          {todos.map(item=>{
           return (showFinished || !item.isComplete)&&<div className='flex my-2 justify-between bg-yellow-50 p-3 mx-2 rounded shadow gap-1 ' onClick={()=>handleCheckbox(item.id)}>
            <div  className='flex items-center gap-1  ' >
            <input name={item.id} checked={item.isComplete} onClick={(e)=>{e.stopPropagation();handleCheckbox(item.id)}} type="checkbox" className='accent-blue-700 translate-y-[2px]'  />
            <div className={item.isComplete ? "line-through text-gray-600 text-opacity-40 ml-1  w-[410px] break-all " :  "text-blue-900 ml-1 w-[410px] break-all" }>{item.text}</div>
            </div>
              <div className='button flex h-full'>
              <button onClick={(e)=>{e.stopPropagation();handleEdit(e,item.id)}} className='text-[14px] shadow bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-2 rounded transition-transform transform active:translate-y-1'>Edit</button>
              <button onClick={(e)=>{e.stopPropagation();handleDelete(e,item.id)}} className='text-[14px] shadow bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 mx-2 rounded transition-transform transform active:translate-y-1'>Delete</button>
              </div>
              
            </div>
          })}
        
        </div>
        </div>
        </div>
      </div>
    </>
  )
}



export default App
