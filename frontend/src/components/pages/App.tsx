import { useEffect, useState } from 'react'
import './App.css'

import TaskList from '../TaskList.tsx'
import TaskForm from '../TaskForm.tsx'
import { connect, fetchTasks } from '../../queries.ts'
import { useNavigate } from 'react-router'



function App() {
  const [tasks, setTasks] = useState([])
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  
  const loadTasks = async () => {
    const fetchedTasks = await fetchTasks()
    setTasks(fetchedTasks)
  }

  const createTask = async (e: Event) => {
    e.preventDefault()
    if(description){
      await fetch("http://localhost:8080/tasks", {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer <${localStorage.getItem("authToken")}>`
        },
        body: JSON.stringify({description})
      })

      setDescription("")
      loadTasks()
    }

  }

  const checkToken = async () => {
    const token = localStorage.getItem("authToken")
    if(!token){
      navigate("/login")
      return
    }

    const response = await fetch("http://localhost:8080/verify", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    })

    if(response.status !== 200){
      navigate("/login")
    }

  }

  useEffect(() => {
    checkToken()
    loadTasks()
  }, [])

  return (
    <div className='flex justify-center w-full'>
      <div className=''>
        <h1 className='text-2xl font-bold text-center my-5'>Gestionnaire de taches</h1>
        <TaskForm 
          description={description}
          setDescription={setDescription}
          onSubmit={createTask}
        />
        <TaskList tasks={tasks} setTasks={setTasks}/>
      </div>
    </div>
  )
}

export default App
