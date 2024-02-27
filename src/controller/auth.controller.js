const authService = require('../service/auth.service')

class AuthController {
    generateNewAccessTokenByRefreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body
            const token = await authService.verifyRefreshToken(refreshToken);
            return res.json(token)
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }
}

const authController = new AuthController()
module.exports = authController
