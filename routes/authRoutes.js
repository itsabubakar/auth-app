const { Router } = require('express')
const router = Router()

const {
    signup, login, findUser, updateUser, gSignup
} = require('../controllers/authController')


router.route('/google').post(gSignup)
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/userdetail').post(findUser)
router.route('/updateuser').post(updateUser)

// router.route('/cookie').get((req, res) => {
//     res.setHeader('Set-Cookie', 'newUser=true')

//     res.send('bitch cookies!!')
// })




module.exports = router