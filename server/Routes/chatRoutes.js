const express = require('express')
const router = express.Router()
const {getChats, addChat} = require('../Controllers/chatController')

//get all chats of the admin
router.get("/:id", getChats)

router.post("/", addChat)


module.exports = router