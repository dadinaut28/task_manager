const { Router } = require("express");
const { verifyToken } = require("./taskRouter");

const usersRouter = new Router();

usersRouter.get("/me", verifyToken, (req, res) => {
  const {
    user: { id, username },
  } = req;
  res.status(200).json({
    message: "Infos de l'utilisateur retournées avec succès !",
    user: {
      id,
      username,
    },
  });
});

module.exports = usersRouter;
