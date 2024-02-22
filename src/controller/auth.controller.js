const authService = require('../service/auth.service')

class AuthController {
    generateNewAccessTokenByRefreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body // http로 넘어가서 파싱함

            const token = await authService.verifyRefreshToken(refreshToken) // 서비스 호출
            return res.json(token)
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }
}

const authController = new AuthController()
module.exports = authController
