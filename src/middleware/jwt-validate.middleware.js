const authService = require('../service/auth.service')

const jwtValidate = async (req, res, next) => {
    try {
        // 헤더에서 accessToken 가져오기
        const { accessToken } = req.cookies;
        
        if (!accessToken) {
            throw new Error('인증 정보가 올바르지 않습니다.')
        }

        const user = await authService.verifyAccessToken(tokenValue)

        // user 정보 담기
        res.locals.user = user

        next()
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = jwtValidate
