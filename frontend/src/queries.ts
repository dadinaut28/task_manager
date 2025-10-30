const api_url = import.meta.env.VITE_API_URL

export async function connect(email, password){
    try {
        const response = await fetch(`${api_url}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json()
        const token = data.token
        
        localStorage.setItem("authToken", token)

        return response
    }

    catch (err){
        console.error(err)
    }
}


export async function fetchTasks(){
    const response = await fetch(`${api_url}/tasks/`, {
        headers: {
            "Authorization": `Bearer <${localStorage.getItem("authToken")}>`
        }
    })
    const data = await response.json()
    
    return data.tasks
}