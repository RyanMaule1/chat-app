const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
    return token
}

const signup = async (req, res) => {
    const {phone, password, checkPassword} = req.body
    try {
        const user = await User.signup(phone, password, checkPassword)

        //after usr is saved to db, create a token for them
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res) => {
    const {phone, password} = req.body
    try {
        const user = await User.login(phone, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup, login}