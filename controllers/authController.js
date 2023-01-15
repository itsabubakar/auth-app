const User = require('../model/User')
const bcyrpt = require('bcrypt')

// handle errs
function handleErrors(err) {
    let errors = { email: '', password: '' }

    // duplicate err code
    if (err.code === 11000) {
        errors.email = 'email exists'
        return errors
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

async function signup(req, res) {
    const { email, password } = req.body
    const salt = await bcyrpt.genSalt(10)
    const hashPwd = await bcyrpt.hash(password, salt)

    try {
        let password = hashPwd
        const user = await User.create({ email, password })
        console.log(user)
        res.status(201).json({ user })
    } catch (error) {
        const errors = handleErrors(error)
        console.log(errors)
        res.status(400).json(errors)
    }
}

async function login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const auth = await bcyrpt.compare(password, user.password)
        if (auth) {
            return res.status(200).json({ user, password })
        }
        return res.status(400).json('password or email incorrect')
    }
}

module.exports = {
    signup,
    login
}