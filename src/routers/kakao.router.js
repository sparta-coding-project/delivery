const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/kakao', passport.authenticate('kakao'))

router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.render('index.ejs')
    }
)

module.exports = router
