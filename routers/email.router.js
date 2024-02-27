const express = require('express')
const jwtValidate = require('../middleware/jwt-validate.middleware')
const { mailSender } = require('./mail')

const router = express.Router()

router.get('/mail', jwtValidate, (req, res, next) => {
    const { email } = req.body

    let emailParam = {
        toEmail: email,
        subject: '회원가입 승인 이메일입니다.',
        text: '회원가입 승인 이메일입니다.',
    }

    mailSender.sendGmail(emailParam)
    res.status(200).send('success')
})

module.exports = router
