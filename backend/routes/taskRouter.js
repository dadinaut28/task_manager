const { Router } = require('express')
const { postTask, putTask, deleteTask, getTasks } = require('../controllers/taskController')
const taskRouter = Router()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
        res.status(403).json({ message: 'Accès non autorisé' })
    }
    
    const tokenRaw = authorizationHeader.split(" ")[1]
    const tokenArr = tokenRaw.split("")
    tokenArr.splice(0, 1)
    tokenArr.splice((tokenArr.length - 1), 1)

    const token = tokenArr.join("")

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY , (err, tokenData) => {
            if(err){
                res.json({ message: "Accès non autorisé ! Erreur token !" })
            }
            else {
                req.user = tokenData.user
                next()
            }
        })
    }
    else {
        res.json({
            message: "Accès autorisé !!"
        })
    }
}

taskRouter.get("/", verifyToken, getTasks)
// taskRouter.get("/:taskId", getTask)
taskRouter.post("/", verifyToken, postTask)
taskRouter.put("/:taskId", verifyToken, putTask)
taskRouter.delete("/:taskId", verifyToken, deleteTask)

module.exports = taskRouter