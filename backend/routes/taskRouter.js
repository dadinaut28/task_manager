const { Router } = require("express");
const {
  postTask,
  putTask,
  deleteTask,
  getTasks,
} = require("../controllers/taskController");
const taskRouter = Router();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Accès non autorisé ! Erreur token !" });
      } else {
        req.user = payload.user;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Accès autorisé !!",
    });
  }
};

taskRouter.get("/", verifyToken, getTasks);
// taskRouter.get("/:taskId", getTask)
taskRouter.post("/", verifyToken, postTask);
taskRouter.put("/:taskId", verifyToken, putTask);
taskRouter.delete("/:taskId", verifyToken, deleteTask);

module.exports = {
  taskRouter,
  verifyToken,
};
