const { dataSource } = require('../typeorm')
const userRepository = require('./user.repository')

jest.mock('../typeorm')

describe('UserRepository', () => {
    describe('userId로 사용자를 조회한다', () => {
        it('사용자가 정상 조회된다', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })
            const result = await userRepository.findOneUserByUserId(1)
            expect(result).toHaveProperty('userId')
            expect(result).toHaveProperty('name')
            expect(result).toBeDefined()
        })
    })

    describe('clientId로 사용자를 조회한다', () => {
        it('사용자가 정상 조회된다', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })
            const result = await userRepository.selectOneUserByClientId('cl')
            expect(result).toHaveProperty('userId')
            expect(result).toHaveProperty('name')
            expect(result).toBeDefined()
        })
    })

    describe('email로 사용자를 조회한다', () => {
        it('사용자가 정상 조회된다', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })
            const result = await userRepository.selectOneUserByEmail('a@b.com')
            expect(result).toHaveProperty('userId')
            expect(result).toHaveProperty('name')
            expect(result).toBeDefined()
        })
    })

    describe('email, password로 사용자를 조회한다', () => {
        it('사용자가 정상 조회된다', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })
            const result = await userRepository.selectOneUserByEmailAndPassword(
                'a@b.com',
                'pl'
            )
            expect(result).toHaveProperty('userId')
            expect(result).toHaveProperty('name')
            expect(result).toBeDefined()
        })
    })
})
