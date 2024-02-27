const authService = require('../../../src/service/auth.service')
const jwtwebToken = require('jsonwebtoken')
const userRepository = require('../../../src/repository/user.repository')

jest.mock('jsonwebtoken')
jest.mock('../../../src/repository/user.repository')

describe('AuthService', () => {
    describe('AccessToken 인증', () => {
        it('accessToken이 정상 인증된다', async () => {
            jwtwebToken.verify.mockReturnValue({
                userId: 1,
            })
            userRepository.findOneUserByUserId.mockResolvedValueOnce({
                userId: 1,
                name: '홍길동',
            })

            const accessToken = 'testToken'
            const result = await authService.verifyAccessToken(accessToken)
            expect(result).toBeDefined()
            expect(result.userId).toBe(1)
        })

        it('accessToken이 올바르지 않으면 인증 실패가 발생한다', async () => {
            jwtwebToken.verify.mockReturnValue({})

            const accessToken = 'testToken'
            await expect(
                authService.verifyAccessToken(accessToken)
            ).rejects.toThrow(new Error('인증 정보가 올바르지 않습니다.'))
        })

        it('accessToken이 올바르지만 해당 사용자가 없으면 오류가 발생한다', async () => {
            jwtwebToken.verify.mockReturnValue({
                userId: 1,
            })
            userRepository.findOneUserByUserId.mockResolvedValueOnce(undefined)

            const accessToken = 'testToken'
            await expect(
                authService.verifyAccessToken(accessToken)
            ).rejects.toThrow(new Error('인증 정보가 올바르지 않습니다.'))
        })
    })

    describe('RefreshToken 인증', () => {
        it('RefreshToken 정상 인증', async () => {
            jwtwebToken.verify.mockReturnValue({
                userId: 1,
            })
            userRepository.findOneUserByUserId.mockResolvedValueOnce({
                userId: 1,
                name: '홍길동',
            })
            jwtwebToken.sign
                .mockReturnValueOnce('newAccessToken')
                .mockReturnValueOnce('newRefreshToken')

            const refreshToken = 'token'
            const result = await authService.verifyRefreshToken(refreshToken)
            expect(result).toBeDefined()
            expect(result).toMatchObject({
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken',
            })
        })

        it('RefreshToken 정상 인증', async () => {
            jwtwebToken.verify.mockReturnValue({})

            const refreshToken = 'token'
            await expect(
                authService.verifyRefreshToken(refreshToken)
            ).rejects.toMatchObject({
                code: 401,
                message: '토큰 정보가 올바르지 않습니다',
            })
        })
    })
})
