const Chat = require('../Models/chatsModel')
const mongoose = require('mongoose')
const User = require('../Models/userModel')
//Get all chats
const getChats = async (req, res) => {
    const {id} = req.params
    try {
        const {phone} = await User.findById(id)
        const chats = await Chat.find({members: {$elemMatch: {phone}}})
        res.status(200).json(chats)
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error.message)
    }
}

//Add a chat
const addChat = async (req, res) => {
    //will tag with the users id so they are the admin
     const {name, members, admin} = req.body
    try {
        const chat = await Chat.create({name, members, admin})
        res.status(200).json(chat)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


module.exports = {getChats, addChat}