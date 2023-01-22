const User = require('../model/User')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getMaxListeners } = require('../model/User')

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

const maxAge = 24 * 60 * 60
function createToken(id) {
    return jwt.sign({ id }, 'sadiq b secret', {
        expiresIn: maxAge
    })
}

async function signup(req, res) {
    const { email, password } = req.body
    const salt = await bcyrpt.genSalt(10)
    const hashPwd = await bcyrpt.hash(password, salt)
    const regularPwd = password

    try {
        let password = hashPwd
        const user = await User.create({ email, password })
        const userId = user._id
        const token = createToken(user._id)
        res.status(201).json({ email, token, userId, regularPwd })
    } catch (error) {
        const errors = handleErrors(error)
        console.log(errors)
        res.status(400).json(errors)
    }
}

async function login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const regularPwd = password

    if (user) {
        res.cookie('hello', 'test cookue')
        const auth = await bcyrpt.compare(password, user.password)
        if (auth) {
            const token = createToken(user._id)
            const userId = user._id
            return res.status(201).json({ email, token, userId, regularPwd })
        }
        return res.status(400).json('password or email incorrect')
    }
}

async function updateUser(req, res) {
    const { name, bio, phone, _id } = req.body
    const user = await User.findOne({ _id })
    if (user) {
        user.name = name
        user.bio = bio
        user.phone = phone
        await user.save()
        console.log(user)
        return res.status(200).json({ name, bio, phone })
    }
    return res.status(400).json('Unable to save info to db')
}

async function findUser(req, res) {
    const { id } = req.body
    const _id = id

    const user = await User.findOne({ _id })
    console.log(user)
    if (user) {
        return res.status(200).json({ user })
    }
    return res.status(200).json('unable to find user')
}

module.exports = {
    signup,
    login,
    findUser,
    updateUser
}