const Contact = require('../Models/contactsModel')
const mongoose = require('mongoose')


const getContacts = async (req, res) => {
    //need to get all the contacts the user has based on the user_id of the contacts equalling the user
    const {id} = req.params
    
    try {
        if (!id|| !mongoose.Types.ObjectId.isValid(id)) {
            throw Error('User must be logged in with a valid id to access contacts')
        }

       const contacts = await Contact.find({user_id: id})
        res.status(200).json(contacts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addContacts = async (req, res) => {

    const {phone, name, user_id} = req.body

    //we will just use the validate user function to get the phone number and make sure the user exists
   
    try {
        const user = await Contact.validateContact(name, phone, user_id)
        if (user) {
            const contact = await Contact.create({phone: user.phone, name, user_id})
            res.status(200).json(contact)
        }
       
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {addContacts, getContacts}