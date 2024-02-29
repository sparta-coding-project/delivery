const express = require('express')
const jwtValidate = require('../middleware/jwt-validate.middleware')
const userController = require('../controller/user.controller')

const router = express.Router()

router.post('/sign-up', userController.userSignUp)

router.post('/sign-in', userController.userSignIn)

router.get('/me', jwtValidate, userController.getMyInfo)

module.exports = router
