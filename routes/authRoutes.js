const { Router } = require('express')
const router = Router()

const {
    signup, login, findUser
} = require('../controllers/authController')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/userdetail').post(findUser)

// router.route('/cookie').get((req, res) => {
//     res.setHeader('Set-Cookie', 'newUser=true')

//     res.send('bitch cookies!!')
// })




module.exports = router