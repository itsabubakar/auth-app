const User = require('../model/User')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    try {
        let password = hashPwd
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ email, token })
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
        res.cookie('hello', 'test cookue')
        const auth = await bcyrpt.compare(password, user.password)
        if (auth) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            return res.status(200).json({ email, token })
        }
        return res.status(400).json('password or email incorrect')
    }
}

async function findUser(req, res) {
    console.log(req.body)
    // const { email } = req.body
    // const user = await User.findOne({ email })
    // if (user) {
    //     return res.status(200).json(user)
    // }
    // return res.status(400).json('password or email incorrect')
}


async function logout_get(req, res) {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

module.exports = {
    signup,
    login,
    findUser
}