const pool = require("../db/pool")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


async function postRegister(req, res){
    const { email, password, username } = req.body
    try {
        if(email && password && username){
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3)',
                [email, hashedPassword, username]
            )

            res.status(200).json({
                message: 'Compte créé avec succès !!'
            })
        }
        else {
            res.status(400).json({
                message: "Entrée invalide ! Vérifiez vos identifiants."
            })
        }

    }
    catch (err){
        if(err){
            res.status(500).json({
                message: "Une erreur s'est produite!"
            })
            // console.log(err)
        }
    }
}


async function postLogin(req, res){
    const { email, password } = req.body

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = rows[0]

        if(!user){
            res.status(400).json({
                message: "Email incorrect"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            res.status(400).json({ message: "Mot de passe incorrect !!" })
        }
        else {
            const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY , { expiresIn: '1h' })
            
            if(token){
                res.status(200).json({token})
            }
        }

    } 
    catch (err){
        console.log(err)
        if(err){
            res.status(500).json({
                message: "Une erreur s'est produite !"
            })
        }
    }

}

module.exports = {
    postRegister,
    postLogin
}