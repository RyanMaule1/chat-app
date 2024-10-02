const express = require('express')
const router = express.Router()
const {addMessage, getMessages} = require('../Controllers/messagesController')
//get all messages of the admin
router.get("/:id", getMessages)

router.post("/:id", addMessage)

module.exports = router