// const { jest } = require("jest");
const CartsRepository = require('../../src/repository/carts.repository')

describe('carts repository', () => {
    test('', async () => {
        const dataSource = {
            getRepository: jest.fn(() => ({
                find: jest.fn(() => ({
                    cartId: 1,
                    userid: 1,
                    menuId: 1,
                })),
                findOne: jest.fn(() => ({
                    cartId: 1,
                    userid: 1,
                    menuId: 1,
                })),
                create: jest.fn(() => {
                    
                }),
                update: jest.fn(),
                delete: jest.fn(),
            })),
        }
        const cartsRepository = new CartsRepository(dataSource)
        expect(await cartsRepository.selectAllCartsByUserId(1)).toEqual({
            cartId: 1,
            userid: 1,
            menuId: 1,
        })
        expect(
            await cartsRepository.selectOneCart({ userId: 1, cartId: 1 })
        ).toEqual({
            cartId: 1,
            userid: 1,
            menuId: 1,
        })
    })
})
