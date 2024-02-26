const userController = require('./user.controller')
const userService = require('../service/user.service')

jest.mock('../service/user.service')

describe('UserController', () => {
    describe('회원가입', () => {
        it('clientId를 통한 정상 회원가입', async () => {
            const responseData = [{ name: 'foo' }]
            const request = {
                body: {
                    clientId: 'cl',
                    name: 'foo',
                    grade: 'user',
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            userService.userSignUp.mockResolvedValueOnce(undefined)

            const result = await userController.userSignUp(request, response)
            expect(result).toMatchObject(responseData)
        })
    })

    describe('로그인', () => {
        it('clientId를 통한 정상 로그인', async () => {
            const responseData = {
                accessToken: 'a',
                refreshToken: 'f',
            }
            const request = {
                body: {
                    clientId: 'cl',
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            userService.userSignIn.mockResolvedValueOnce(responseData)

            const result = await userController.userSignIn(request, response)
            expect(result).toMatchObject(responseData)
        })
    })

    describe('내 정보 조회', () => {
        it('locals를 통한 정보 조회', async () => {
            const responseData = {
                name: 'foo',
            }
            const request = {}
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
                locals: {
                    user: {
                        userId: 1,
                        name: 'foo',
                    },
                },
            }

            const result = await userController.getMyInfo(request, response)
            expect(result).toMatchObject(responseData)
        })
    })
})
