const db = require('../models/database')
const User = db.users
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../jwtKey')
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_task', 'postgres', 'root', {
    dialect: 'postgres',
    //host: 'localhost'
})

const generateAccessToken = (password, username) => {
    const payload = {
        password,
        username 
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400).json({message:'Registration error', errors})
            await sequelize.sync().then(result=>{
                console.log(result);
              })
            const {username, name, password} = req.body
            const newUser = await User.findOne({where:{username: `${username}`}})
            if (newUser) {
                return res.status(400).json({message: 'This user name is alredy taken!'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            await User.create({username, name, password: hashPassword})
            return res.json({message: 'You have successfully registered!'})
        } catch(e){
            console.log(e)
            res.status(400).json({message : 'Registration error'})
        }
    }

    async login(req, res) {
        try{
            const {username, password} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
                res.status(400).json({message:`User ${username} is not found!`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                res.status(400).json({message:`Incorrect password!`}) 
            }
            const token = generateAccessToken(user.username, user.password)
            return res.json(token)
        } catch(e){
            console.log(e)
            res.status(400).json({message : 'login error'})
        }
    }

    async getUsers(req, res) {
        try{
            const users = await User.findAll({raw:true})
            res.json(users)
        } catch(e){
            
        }
    }
}

module.exports = new authController() 