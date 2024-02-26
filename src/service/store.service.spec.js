const storeService = require('./store.service')
const storeRepository = require('../repository/store.repository')

jest.mock('../repository/store.repository')

describe('StoreService', () => {
    describe('모든 식당 조회', () => {
        it('전체 식당이 정상 조회된다', async () => {
            storeRepository.selectAllSortedStores.mockResolvedValueOnce([
                {
                    storeId: 1,
                },
            ])

            const sort = {
                orderKey: 'storeId',
                orderValue: 'desc',
            }

            const result = await storeService.findAllSortedStores(sort)

            expect(result).toBeDefined()
            expect(result).toHaveLength(1)
        })
    })

    describe('식당 상세 조회', () => {
        it('storeId를 통해 식당이 정상 조회된다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce({
                storeId: 1,
            })

            const result = await storeService.findOneStoreByStoreId(1)

            expect(result).toHaveProperty('storeId')
        })
    })

    describe('식당 생성', () => {
        it('식당을 정상 생성한다', async () => {
            storeRepository.createStore.mockResolvedValueOnce(undefined)

            const data = {}
            const result = await storeService.createStore(data)

            expect(result).not.toBeDefined()
        })
    })

    describe('식당 수정', () => {
        it('식당을 정상 수정한다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce({
                storeId: 1,
                userId: 1,
                name: 'tester(edited)',
            })
            storeRepository.updateStoreByStoreId.mockResolvedValueOnce(
                undefined
            )

            const data = {}
            const byUser = {
                grade: 'BIZ',
                userId: 1,
            }
            const result = await storeService.updateStoreByStoreId(
                1,
                data,
                byUser
            )

            expect(result).not.toBeDefined()
        })

        it('존재하지 않는 식당에 대해 수정할 수 없다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce(
                undefined
            )

            const data = {}
            const byUser = {
                grade: 'BIZ',
                userId: 1,
            }
            await expect(
                storeService.updateStoreByStoreId(1, data, byUser)
            ).rejects.toMatchObject({
                code: 401,
                message: '존재하지 않는 식당입니다.',
            })
        })

        it('본인 식당 아니면 수정할 수 없다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce({
                storeId: 1,
                userId: 1,
                name: 'tester(edited)',
            })

            const data = {}
            const byUser = {
                grade: 'BIZ',
                userId: 3,
            }
            await expect(
                storeService.updateStoreByStoreId(1, data, byUser)
            ).rejects.toMatchObject({
                code: 401,
                message: '올바르지 않은 요청입니다.',
            })
        })
    })

    describe('식당 삭제', () => {
        it('식당이 정상 삭제된다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce({
                storeId: 1,
                userId: 1,
                name: 'tester',
            })
            storeRepository.deleteStoreByStoreId.mockResolvedValueOnce(
                undefined
            )

            const byUser = {
                grade: 'BIZ',
                userId: 1,
            }
            const result = await storeService.deleteStoreByStoreId(1, byUser)
            expect(result).not.toBeDefined()
        })

        it('식당이 없다면 에러가 반환된다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce(
                undefined
            )

            const byUser = {
                grade: 'BIZ',
                userId: 1,
            }
            await expect(
                storeService.deleteStoreByStoreId(1, byUser)
            ).rejects.toMatchObject({
                code: 400,
                message: '존재하지 않는 식당입니다.',
            })
        })

        it('본인 식당이 아니면 삭제할 수 없다', async () => {
            storeRepository.selectOneStoreByStoreId.mockResolvedValueOnce({
                storeId: 1,
                userId: 1,
                name: 'tester',
            })

            const byUser = {
                grade: 'BIZ',
                userId: 3,
            }
            await expect(
                storeService.deleteStoreByStoreId(1, byUser)
            ).rejects.toMatchObject({
                code: 400,
                message: '올바르지 않은 요청입니다.',
            })
        })
    })
})
