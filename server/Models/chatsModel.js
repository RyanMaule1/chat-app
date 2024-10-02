const mongoose = require('mongoose')
const Schema = mongoose.Schema


const contactsSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String,
        required: true
    }
})

const chatSchema = new Schema({
    name: {
        type: String
    },
    admin: {
        //creator of the chat
        type: String,
    },
    members: [contactsSchema],

}, {timestamps: true})



module.exports = mongoose.model('Chat', chatSchema)


