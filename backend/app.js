require('dotenv').config() 

const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const taskRouter = require('./routes/taskRouter')
const authRouter = require('./routes/authRouter')


require('dotenv').config() 
const app = express()

app.use(express.json())
app.use(cors())

app.use("/tasks", taskRouter)
app.use("/auth", authRouter)

app.post("/verify", (req, res) => {

    const { token } = req.body

    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, user) => {
        if(err){
            res.status(400).json({
                message: "Token invalide"
            })
        }
        else {
            res.status(200).json({
                message: "Token valide !"
            })
        }
    })

})

const PORT = process.env.PORT || 8080
app.listen(PORT, (err) => {
    if(err){
        console.error(err)
    }
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT} !!!`)
})