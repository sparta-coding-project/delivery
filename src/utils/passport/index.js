const passport = require('passport')
const { dataSource } = require('../../typeorm')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')

export default () => {
    passport.serializeUser(function (user, done) {
        done(null, user.userId)
    })
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await dataSource.getRepository('User').findOne({
                where: {
                    userId: id,
                },
            })
            done(null, user)
        } catch (err) {
            done(err)
        }
    })

    local()
    kakao()
}
