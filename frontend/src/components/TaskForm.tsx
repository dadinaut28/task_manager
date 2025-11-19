import type { FormEventHandler, SetStateAction, Dispatch } from "react"
import Button from "./Button"
import Input from "./Input"

interface TaskFormProps {
    description: string
    setDescription: Dispatch<SetStateAction<string>>
    onSubmit: FormEventHandler
}

function TaskForm({description, setDescription, onSubmit}: TaskFormProps) {
    return (
    <form onSubmit={onSubmit} className="flex items-center ">
        
        <Input 
            placeholder="Ajouter une nouvelle tache..."
            value={description}
            onChange={setDescription}
            className="border-1 border-gray-300 rounded-md w-48 text-sm h-8 pl-1"
        />
        <Button content="Ajouter" className="px-3.5 ml-2 cursor-pointer text-white font-bold bg-blue-500 rounded-md h-8"/>
    </form>
  )
}

export default TaskForm