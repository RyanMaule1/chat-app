const Message = require('../Models/messagesModel')


const addMessage = async (req, res) => {
    const {text, sender_id} = req.body
    const {id} = req.params
    try {
        const msg = await Message.create({text, sender_id, chat_id: id})
        // io.on('connection', socket => {[
        //     socket.emit('sendMessage', msg)
        // ]})
        res.status(200).json(msg)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//whenever a message is added we should emit the message to the client

const getMessages = async (req, res) => {
    const {id} = req.params
    //need to get the messages based on the chat id passed in
    try {
        const messages = await Message.find({chat_id: id})
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {addMessage, getMessages}