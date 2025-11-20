import type { SetStateAction, Dispatch } from 'react'
import { TaskRow } from './TaskRow'

interface Task { 
    id: number
    description: string
}

interface TaskListProps {
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>> | Dispatch<SetStateAction<never[]>>
}

function TaskList({tasks, setTasks}: TaskListProps) {
  return (
    <div className='mt-7'>
        {
            tasks.map((task) => {
                return <TaskRow key={task.id} task={task} setTasks={setTasks}/>
            })
        }
    </div>
  )
}

export default TaskList