import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { Link, useNavigate } from "react-router";

const api_url = import.meta.env.VITE_API_URL

export function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const navigate = useNavigate()

  const createAccount = async ( email: string, password: string, username: string) => {
    if(email && password){
      try {
        const response = await fetch(`${api_url}/auth/register`, {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({email, password, username})
        })

        if(response.ok){
          setShowSuccessMessage(true)
          setEmail("")
          setPassword("")
          setUsername("")
          navigate("/login")
        }

      }
      catch (err){
        console.log(err)
      }
    }
  }

  return <div className="flex items-center justify-center h-[100vh]">
    <div>
      <h1 className="text-center text-2xl font-bold">Inscrivez-vous</h1>
      {
        showSuccessMessage && 
        <div className="flex ml-3 bg-sky-600 rounded-md w-60 h-10 px-2 justify-between items-center mt-1.5">
          <span className="mr-2 text-white">Compte créé avec succès</span>
          <span className="font-bold cursor-pointer" onClick={() => {setShowSuccessMessage(false)}}>X</span>
        </div>
      }
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          createAccount(email, password, username)
        }} 
        className="flex flex-col mt-2.5 items-center"
      >
        <Input 
          value={username} 
          onChange={setUsername} 
          placeholder="mysuperusername"
          id="username"
          label="Username*"
          className="pl-1 py-1 rounded-md border-1 border-gray-400"
        />
        <Input 
          id="email"
          label="Email*"
          className="pl-1 py-1 rounded-md border-1 border-gray-400" placeholder="bradley@gmail.com"
          value={email} 
          onChange={setEmail}
        />
        <Input 
          id="password"
          label="Password*"
          className="pl-1 py-1 rounded-md border-1 border-gray-400"       type="password" 
          placeholder="yourpass***d" 
          value={password} 
          onChange={setPassword}
        />
        <Button 
          content="M'inscrire" 
          className="px-1.5 cursor-pointer w-[70%] bg-sky-500 rounded-3xl h-9 text-white mt-2"
        />
      </form>
      <p className="text-center text-sm mt-3.5">
        Vous avez déjà un compte ? 
        <Link className="text-blue-600 underline ml-1" to="/login">Connectez-vous</Link>
      </p>
    </div>
  </div>
}