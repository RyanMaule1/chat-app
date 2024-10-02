const express = require('express')
const router = express.Router()
const {addContacts, getContacts} = require('../Controllers/contactsController')

//get contacts
router.get("/:id", getContacts)

//add a contact
router.post("/", addContacts)

module.exports = router