const {
  getUserTasks,
  getOneTask,
  insertNewTask,
  updateTask,
  deleteOneTask,
} = require("../db/queries");

async function getTasks(req, res) {
  try {
    const id = req.user.id;
    const tasks = await getUserTasks(id);
    res.status(200).json({
      message: "La liste complète des taches",
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Une erreur s'est produite !",
    });
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

async function postTask(req, res) {
  try {
    const { description } = req.body;
    const userId = req.user.id;
    const newTask = await insertNewTask(description, userId);

    res.status(201).json({
      message: "La tache a bien été ajoutée",
      newTask,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Une erreur s'est produite !",
      });
    }
  }
}

async function putTask(req, res) {
  try {
    const { taskId } = req.params;
    const { newDescription, newStatus } = req.body;

    const updatedTask = await updateTask(taskId, newDescription, newStatus);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Auncun utilisateur avec cet id n'a été trouvé !!",
      });
    }

    res.status(200).json({
      message: "La tache a bien été mise à jour",
      updatedTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erreur interne au serveur !!",
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user.id;
    const deletedTask = await deleteOneTask(taskId, userId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "La tache avec avec cet n'a pas été trouvée !",
      });
    }

    res.status(200).json({
      message: "La tache a bien été supprimée",
      deletedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Une erreur s'est produite",
    });
  }
}

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
};
