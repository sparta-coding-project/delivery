const authController = require('./auth.controller')
const authService = require('../service/auth.service')

jest.mock('../service/auth.service')

describe('AuthController', () => {
    describe('RefreshToken으로 새로운 accessToken 발급', () => {
        it('정상 발급된다', async () => {
            const responseData = {
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken',
            }
            const request = {
                body: {
                    refreshToken: 'oldRefreshToken',
                },
            }

            const response = {
                status: jest.fn(() => response), // status를 넣으면 json이 다시 호출되어 체이닝 돼있음
                json: jest.fn(() => responseData),
            }

            authService.verifyRefreshToken.mockResolvedValueOnce(responseData)

            const result =
                await authController.generateNewAccessTokenByRefreshToken(
                    request,
                    response
                )
            console.log('result', result)
            expect(result).toMatchObject(responseData)
        })
    })
})
