const { Router } = require('express')
const { postRegister, postLogin } = require('../controllers/authController')

const authRouter = Router()

authRouter.post("/register", postRegister)
authRouter.post("/login", postLogin)

module.exports = authRouter