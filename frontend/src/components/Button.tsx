import type { MouseEventHandler } from "react"

interface ButtonProps {
    content: string
    onClick: MouseEventHandler
    className: string
}

function Button({content, onClick, className}: ButtonProps) {

    const defaultClass = "h-8 w-24 cursor-pointer bg-blue-600 rounded-md text-white"
    const buttonClass = className ? className: defaultClass

  return (
    <button className= {buttonClass} onClick={onClick}>{content}</button>
  )
}

export default Button