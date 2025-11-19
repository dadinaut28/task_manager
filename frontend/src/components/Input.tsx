import type { SetStateAction, Dispatch } from "react"

interface InputProps {
    id?: string
    label?: string
    type?: string | undefined
    className?: string
    placeholder?: string
    value?: string
    onChange: Dispatch<SetStateAction<string>>
}

function Input({id, label, type = "text", className, value, placeholder, onChange}: InputProps) {

  const defaultClass = "pl-2 border-gray-200 border-2 rounded-sm  h-8"
  const inputClass = className ? className: defaultClass

  return (
    <div className="my-2 flex flex-col">
      <label className="font-bold" htmlFor={id}>{label}</label>
      <input 
        id={id}
        onChange={(e) => {onChange(e.target.value)}} 
        className={inputClass} 
        type={type} 
        value={value} 
        placeholder={placeholder}
    />
    </div>
  )
}

export default Input