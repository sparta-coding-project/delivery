class OrdersRepository {
    constructor(dataSource) {
        this.dataSource = dataSource
    }

    ordersRepo = this.dataSource.getRepository('Orders')

    selectAllOrdersByStoreId = async (storeId) => {
        const orders = await this.ordersRepo.find({ storeId })
        return orders
    }

    selectAllOrdersByUserId = async (userId) => {
        const orders = await this.ordersRepo.find({ userId })
        return orders
    }

    createOrder = async ({ menuId, userId, storeId, quantity }) => {
        const createdOrder = await this.ordersRepo.create({
            menuId,
            userId,
            storeId,
            quantity,
        })
        return createdOrder
    }

    cancelOrder = async ({ orderId }) => {
        const canceledOrder = await this.OrdersRepository.delete({
            orderId
        })
    }
}

module.exports = OrdersRepository
