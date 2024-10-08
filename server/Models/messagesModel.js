const mongoose = require('mongoose')
const Schema = mongoose.Schema


const messageSchema = new Schema({
    text: {
        type: String,
    },
    sender_id: {
       type: String,
       required: true
    },
    chat_id: {
        type: String,
        required: true
     }
}, {timestamps: true})


module.exports = mongoose.model('Message', messageSchema)