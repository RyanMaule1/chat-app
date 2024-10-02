const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {phone: phoneValidator} = require('phone')
const { passwordStrength } = require('check-password-strength')



const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }

})

//could contacts just be an array of other user objects referenced by id

userSchema.statics.signup = async function(phone, password, checkPassword) {
    const {isValid, phoneNumber} = phoneValidator(phone)
    //check if phone and password exists
    if (!phone || !password) {
        throw Error('Phone number and Password are required')
    }

    if (!isValid) {
        throw Error('Phone Number is invalid')
    }

    if (passwordStrength(password).id < 2) {
        throw Error('Password must contain an uppercase letter, lowercase letter, number, and symbol and must be at least 8 characters')
    }

    if (password !== checkPassword) {
        throw Error('Passwords do not match')
    }

    //check if the user already exists
    const exists = await this.findOne({phone: phoneNumber})
    if (exists) {
        throw Error('User with that phone number already exists, do you want to login?')
    }

    //want to hash the user password if valid then return the hashed password to be added to our db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    //create user with hashedpassword
    const user = await this.create({phone: phoneNumber, password: hashedPassword})

    return user

}

userSchema.statics.login = async function login (phone, password) {
    if (!phone || !password) {
        throw Error('Phone number and password are required')
    }

    const {phoneNumber} = phoneValidator(phone)

    const user = await this.findOne({phone: phoneNumber})

    if (!user) {
        throw Error('No user exists with this phone number, do you want to signup ?')
    }

    //compare the password entered to login with the encrypted password of the same phone num in the db
    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
        throw Error('Password is incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)