import { dataSource } from '../../typeorm'
const sha256 = require('crypto-js/sha256')

const passport = require('passport')
const LocalStrategy = require('passport-local')

export default () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const exUser = await dataSource
                        .getRepository('User')
                        .findOne({
                            where: { email },
                        })

                    if (exUser) {
                        const sha256 = await sha256(password).toString()
                        const result = checkPW(password, sha256)
                        if (result) {
                            done(null, exUser)
                        } else {
                            done(null, false, {
                                message: '비밀번호가 일치하지 않습니다.',
                            })
                        }
                    } else {
                        done(null, false, {
                            message: '가입하지 않은 유저입니다.',
                        })
                    }
                } catch (err) {
                    done(err)
                }
            }
        )
    )
}
