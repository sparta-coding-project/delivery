const passport = require('passport')
const kakaoStrategy = require('passport-kakao').Strategy
const { dataSource } = require('../../typeorm')

module.exports = () => {
    passport.use(
        new kakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: '/auth/kakao/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('kakao profile', profile)
                try {
                    const exUser = await dataSource
                        .getRepository('User')
                        .findOne({
                            where: {
                                provider: profile.provider,
                                clientId: profile.id,
                            },
                        })

                    if (exUser) {
                        if (exUser.clientId === profile.id) {
                            return done(null, exUser.userId, {
                                message: '로그인되었습니다.',
                            })
                        } else {
                            return done(null, false, {
                                message: '사용자 정보가 잘못되었습니다.',
                            })
                        }
                    } else {
                        const userData = {
                            clientId: profile.id,
                            provider: profile.provider,
                            email: profile._json.email,
                            nickname: profile._json.nickname,
                            age: profile._json.age,
                        }
                        const newUser = await dataSource
                            .getRepository('User')
                            .insert({
                                data: { ...userData },
                            })
                        return done(null, newUser.userId, {
                            message: '회원가입이 완료되었습니다.',
                        })
                    }
                } catch (err) {
                    console.log(err)
                    done(err)
                }
            }
        )
    )
}
