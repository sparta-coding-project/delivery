const express = require('express')

const router = express.Router()

const authController = require('../src/controller/auth.controller')

router.post('/token', authController.generateNewAccessTokenByRefreshToken)

module.exports = router
