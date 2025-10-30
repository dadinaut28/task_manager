import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import { fetchTasks } from "../queries"

const api_url = import.meta.env.VITE_API_URL

interface Task { 
    id: number
    description: string
}

interface TaskRowProps  {
    task: Task
    setTasks: Function
}

export function TaskRow({task, setTasks}: TaskRowProps){
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false)
    // const [description, setDescription] = useState(task.description)
    const [updatedDescription, setUpdatedDescription] = useState(task.description)

    const deleteTask = async () => {
        try {
            await fetch(`${api_url}/tasks/${task.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer <${localStorage.getItem("authToken")}>`
                }
            })

            const tasks = await fetchTasks()
            setTasks(tasks)
            
        }
        catch(err){
            console.error(err)
        }
    }

    const updateTask = async (e: MouseEvent) => {
        e.preventDefault()
        if(updatedDescription){
            try {
                const response = await fetch(`${api_url}/tasks/${task.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer <${localStorage.getItem("authToken")}>`
                    },
                    body: JSON.stringify({description: updatedDescription})

                })
                
                const updatedTasks = await fetchTasks()
                console.log(updatedTasks)
                setTasks(updatedTasks)

                setShowUpdateTaskForm(false)
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return <div className="my-5">  
                <div className="flex items-center justify-between">
                    <li className="truncate w-32 sm:w-40 lg:w-48 inline-block">{task.description}</li>
                    <div>
                        {
                            !showUpdateTaskForm && 
                            <button onClick={() => {setShowUpdateTaskForm(true)}}>
                                <img className="w-8 cursor-pointer" src=".././icons/editing.png" alt="Icon edit" />
                            </button>
                        }
                        <button onClick={deleteTask}>
                            <img className="w-8 ml-2 cursor-pointer" src=".././icons/bin.png" alt="Icon bin" />
                        </button>
                    </div>
                </div>
                {
                    showUpdateTaskForm && 
                    <form onSubmit={updateTask} className="flex items-center justify-end mt-3 pr-2.5">
                        <Input value={updatedDescription} onChange={setUpdatedDescription}/>
                        <Button 
                            content="Terminer" 
                            className="bg-blue-500 text-white rounded-md py-1 text-sm px-2 ml-2 cursor-pointer"
                        />
                    </form>
                }
        </div>
}