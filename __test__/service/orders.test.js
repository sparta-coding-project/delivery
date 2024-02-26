const { jest } = require("jest");
const ordersService = require("../../src/service/orders.service")



describe('order repository',() => {
    test('', () => {
        const ordersRepository = {
            selectAllOrdersByStoreId: jest.fn(()=> {
                return {
                    orderId: 1,
                    userId: 1, 
                    storeId: null,
                }
            }),
            selectAllOrdersByUserId: jest.fn(),
            createOrder: jest.fn(),
            cancelOrder: jest.fn(),
        }
        const ordersService


    })
})