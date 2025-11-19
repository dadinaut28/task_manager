import { useState, type FormEvent } from "react";
import Input from "../Input";
import Button from "../Button";
import { Link, useNavigate } from "react-router";
import { connect } from "../../queries";

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(email && password){
      const response = await connect(email, password)
      if(response?.ok){
        navigate("/")
      }
    }
  }

  return <div className="flex items-center h-[100vh] justify-center">
    <div>
      <h1 className="text-center text-2xl font-bold">Connectez-vous</h1>
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center p-4">
      <Input 
        id="email" 
        type="text"
        label="Email*" 
        className="pl-1 py-1 rounded-md border-1 border-gray-400" 
        placeholder="bradley@gmail.com" 
        value={email} 
        onChange={setEmail}
      />

      <Input 
        id="password" 
        label="Password*" 
        className=" pl-1 py-1 rounded-md border-1 border-gray-400" 
        type="password" 
        placeholder="yourpass***d" 
        value={password} 
        onChange={setPassword}
      />
      <Button 
        content="Me connecter" 
        className="px-1.5 py-1.5 mt-2 w-[80%] bg-sky-500 font-bold text-white rounded-3xl cursor-pointer"
      />
      
    </form>
    <p className="text-sm">
      Vous n'avez pas de compte ? 
      <Link className="text-blue-700 ml-1 underline" to="/register">Inscrivez vous</Link>
    </p>
    </div>
  </div>
}
