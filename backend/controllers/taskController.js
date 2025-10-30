const { getUserTasks, getOneTask, insertNewTask, updateTask, deleteOneTask } = require("../db/queries");

async function getTasks (req, res){
    try {
        const id = req.user.id
        const tasks = await getUserTasks(id)
        res.json({
            message: "La liste complète des taches",
            tasks
        })
    }
    catch(err){
        res.status(500).json({
            message: "Une erreur s'est produite !"
        })
    }
}

// async function getTask(req, res){
//     const taskId = parseInt(req.params.taskId)
//     const task = await getOneTask(taskId)
//     res.json({
//         message: "La tache recherchée",
//         data: task
//     })
// }

async function postTask(req, res){
    try{
        const { description } = req.body
        const userId = req.user.id
        const newTask = await insertNewTask(description, userId)

    res.status(200).json({
        message: "La tache a bien été ajoutée",
        data: newTask
    })
    }
    catch(err){
        if(err){
            res.status(500).json({
                message: "Une erreur s'est produite !"
            })
        }
    }
}

async function putTask(req, res){
    try {
        const taskId = parseInt(req.params.taskId)
        const userId = req.user.id
        const { description } = req.body
        
        const updatedTask = await updateTask(taskId, userId, description)
    
        res.status(200).json({
            message: "La tache a bien été mise à jour",
            task: updatedTask
        })
    }
    catch(err){
        res.status(400).json({
            message: "Vérifiez les entrées et réessayez !"
        })
    }
}

async function deleteTask(req, res){
    try {
        const taskId = parseInt(req.params.taskId)
        const userId = req.user.id
        const deletedTask = await deleteOneTask(taskId, userId)

        res.status(200).json({
            message: "La tache a bien été supprimée",
            data: deletedTask
        })
    }
    catch(err){
        res.status(500).json({
            message: "Une erreur s'est produite"
        })
    }
}


module.exports = {
    getTasks,
    postTask,
    putTask,
    deleteTask
}