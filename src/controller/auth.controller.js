const authService = require('../service/auth.service')

class AuthController {
    generateNewAccessTokenByRefreshToken = async (req, res) => {
        const { refreshToken } = req.body // http로 넘어가서 파싱함

        const token = await authService.verifyRefreshToken(refreshToken) // 서비스 호출
        return res.json(token)
    }
}

const authController = new AuthController()
module.exports = authController
