const { dataSource } = require('../../../src/typeorm')
const storeRepository = require('../../../src/repository/store.repository')

jest.mock('../../../src/typeorm')
// jest.mock('./store.repository')

describe('StoreRepository', () => {
    describe('식당 전체 조회', () => {
        it('정렬된 전체 식당 조회', async () => {
            dataSource.getRepository = (tableName) => ({
                find: jest.fn(() => [
                    {
                        storeId: 1,
                        name: '식당 이름',
                        intro: '식당 소개',
                        storeImage: 'naver.com',
                        user: {
                            name: '박사장',
                        },
                        createdAt: new Date().toISOString(),
                    },
                ]),
            })

            const sort = {
                orderKey: 'storeId',
                orderValue: 'desc',
            }
            const result = await storeRepository.selectAllSortedStores(sort)
            expect(typeof result).toBe('object')
            expect(result).toHaveLength(1)
            expect(result).toBeDefined()
        })

        it('데이터가 없다면 빈 배열이 반환된다', async () => {
            dataSource.getRepository = (tableName) => ({
                find: jest.fn(() => []),
            })

            const sort = {
                orderKey: 'storeId',
                orderValue: 'desc',
            }
            const result = await storeRepository.selectAllSortedStores(sort)
            expect(typeof result).toBe('object')
            expect(result).toHaveLength(0)
            expect(result).toBeDefined()
        })
    })
    describe('식당 상세 조회', () => {
        it('개별 식당 정상 조회', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    storeId: 2,
                    name: '식당 이름',
                    intro: '식당 소개',
                    location: '서울시 동작구',
                    storeImage: 'naver.com',
                    userId: 1,
                    user: {
                        name: '박사장',
                    },
                    createdAt: '2024-11-11T11:12:13Z',
                })),
            })

            const result = await storeRepository.selectOneStoreByStoreId(1)
            expect(typeof result).toBe('object')
            expect(result).toBeDefined()
            expect(result).toMatchObject({
                storeId: 2,
                name: '식당 이름',
                intro: '식당 소개',
                location: '서울시 동작구',
                storeImage: 'naver.com',
                userId: 1,
                user: {
                    name: '박사장',
                },
                createdAt: '2024-11-11T11:12:13Z',
            })
        })
    })

    it('조회된 데이터가 없는 경우 undefined 반환', async () => {
        dataSource.getRepository = (tableName) => ({
            findOne: jest.fn(() => undefined),
        })

        const result = await storeRepository.selectOneStoreByStoreId(1)
        expect(result).not.toBeDefined()
    })

    describe('식당 생성', () => {
        it('식당이 정상 생성된다', async () => {
            dataSource.getRepository = (tableName) => ({
                insert: jest.fn(() => ({
                    insertId: 1,
                })),
            })
            const data = {
                name: '식당 이름',
                intro: '식당 소개',
                location: '서울시 동작구',
                storeImage: 'naver.com',
            }
            const result = await storeRepository.createStore(data)
            expect(result).not.toBeDefined()
        })
    })

    describe('식당 수정', () => {
        it('식당이 정상 수정된다', async () => {
            dataSource.getRepository = (tableName) => ({
                update: jest.fn(() => ({
                    affected: 1,
                })),
            })
            const data = {
                name: '식당 이름',
                intro: '식당 소개',
                location: '서울시 동작구',
                storeImage: 'naver.com',
            }
            const result = await storeRepository.updateStoreByStoreId(1, data)
            expect(result).not.toBeDefined()
        })
    })

    describe('식당 삭제', () => {
        it('식당이 정상 삭제된다', async () => {
            dataSource.getRepository = (tableName) => ({
                delete: jest.fn(() => ({
                    affected: 1,
                })),
            })

            const result = await storeRepository.deleteStoreByStoreId(1)
            expect(result).not.toBeDefined()
        })
    })
})
