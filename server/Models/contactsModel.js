const mongoose = require('mongoose')
const {phone: phoneValidator} = require('phone')
const User = require('./userModel')

const Schema = mongoose.Schema

const contactsSchema = new Schema({
    name: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true, 
        unique: false
    }
})

contactsSchema.statics.validateContact = async function(name, phone, user_id) {

    const {isValid, phoneNumber} = phoneValidator(phone)

    if (!name || !phone) {
        throw Error("Contact name and phone number are required")
    }

    if (!user_id) {
        throw Error("User must be logged in to add or access contacts")
    }

    if (!isValid) {
        throw Error("Phone number entered is invalid")
    }

    const contact = await this.findOne({phone: phoneNumber, user_id})

    if (contact) {
        throw Error('A contact already exists under that phone number')
    }

    const user = await User.findOne({phone: phoneNumber})

    if (!user) {
        throw Error("No user exists with that phone number")
    }

    if (user) {
        return user
    }
}

 



module.exports =  mongoose.model('Contact', contactsSchema)



