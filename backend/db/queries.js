const pool = require("./pool");

async function getUserTasks(userId){
    try {
        const { rows } = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId])
        return rows
    }
    catch (err) {
        console.log("Erreur lors de la demande de la liste complète des taches", err)
    }
}

async function getOneTask(id){
    try {
        const { rows } = await pool.query('SELECT * FROM tasks WHERE id =$1', [id])
        return rows[0]
    } 
    catch (err) {
        console.log("Erreur lors de la demande d'une tache spécifique")
    }
}

async function insertNewTask(description, userId) {
    try {
        const { rows } = await pool.query('INSERT INTO tasks (description, user_id) VALUES ($1, $2) RETURNING *', [description, userId])

        const newUser = rows[0]
        return newUser
    }
    catch (err) {
        console.log("Erreur lors de l'insertion d'une nouvelle tache")
    }
}

async function updateTask(taskId, userId, newDescription){
    try {
        const { rows } = await pool.query('UPDATE tasks SET description = $1, user_id = $3 WHERE id = $2 RETURNING *', [newDescription, taskId, userId])

        const updatedTask = rows[0]
        return updatedTask
    }
    catch (err) {
        console.log("Erreur lors de la mise à jour de la tache")
    }
}


async function deleteOneTask(taskId, userId){
    try {
        const { rows } = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [taskId, userId])
        const deletedTask = rows[0]

        return deletedTask
    }
    catch (err) {
        console.log("La tache a bien été supprimée")
    }
}

module.exports = {
    getUserTasks,
    getOneTask,
    insertNewTask,
    updateTask,
    deleteOneTask
}