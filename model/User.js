const mongoose = require('mongoose')
const { isEmail } = require('validator')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'min length 6 char'],
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
    },

    phone: {
        type: String,
    },
})

// before doc saved
// userSchema.pre('save', async function (next) {
//     const salt = await brcypt.genSalt(10)
//     this.password = await brcypt.hash(this.password, salt)
//     next()
// })

const User = mongoose.model('user', userSchema)

module.exports = User