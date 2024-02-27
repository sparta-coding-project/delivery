const storeController = require('../../../src/controller/store.controller')
const storeService = require('../../../src/service/store.service')

jest.mock('../../../src/service/store.service')

describe('StoreController', () => {
    describe('모든 식당 조회', () => {
        it('모든 식당이 정상 조회된다', async () => {
            const responseData = [{ storeId: 1 }]
            const request = {
                query: {
                    orderKey: 'storeId',
                    orderValue: 'desc',
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            storeService.findAllSortedStores.mockResolvedValueOnce(responseData)

            const result = await storeController.findAllStores(
                request,
                response
            )
            expect(result).toMatchObject(responseData)
        })
    })

    describe('식당 상세 조회', () => {
        it('storeId를 통해 식당이 정상 조회된다', async () => {
            const responseData = { storeId: 1 }
            const request = {
                params: {
                    storeId: 1,
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            storeService.findOneStoreByStoreId.mockResolvedValueOnce(
                responseData
            )

            const result = await storeController.findOneStore(request, response)
            expect(result).toMatchObject(responseData)
        })
    })

    describe('식당 생성', () => {
        it('식당이 정상 생성된다', async () => {
            const request = {
                params: {
                    storeId: 1,
                },
                body: {
                    name: 'tester',
                    intro: 'test for creating stores',
                    storeImage: 'naver.com',
                    location: 'Seoul, Korea',
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
            }

            storeService.createStore.mockResolvedValueOnce(undefined)

            const result = await storeController.findOneStore(request, response)
            expect(result).not.toBeDefined()
        })
    })

    describe('식당 수정', () => {
        it('식당이 정상 수정된다', async () => {
            const request = {
                params: {
                    storeId: 1,
                },
                body: {
                    name: 'tester',
                    intro: 'test for creating stores',
                    storeImage: 'naver.com',
                    location: 'Seoul, Korea',
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
                locals: {
                    user: {
                        userId: 1,
                    },
                },
            }

            storeService.updateStoreByStoreId.mockResolvedValueOnce(undefined)

            const result = await storeController.findOneStore(request, response)
            expect(result).not.toBeDefined()
        })

        // 실패 케이스 추가
    })

    describe('식당 삭제', () => {
        it('식당이 정상 삭제된다', async () => {
            const request = {
                params: {
                    storeId: 1,
                },
            }

            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
                locals: {
                    user: {
                        userId: 1,
                    },
                },
            }

            storeService.deleteStoreByStoreId.mockResolvedValueOnce(undefined)

            const result = await storeController.deleteStore(request, response)
            expect(result).not.toBeDefined()
        })
    })
})
