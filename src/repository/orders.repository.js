class OrdersRepository {
    constructor(dataSource) {
        this.dataSource = dataSource
    }

    selectAllOrdersByStoreId = async (storeId) => {
        const orders = await this.dataSource.getRepository('Orders').find({ storeId })
        return orders
    }

    selectAllOrdersByUserId = async (userId) => {
        const orders = await this.dataSource.getRepository('Orders').find({ userId })
        return orders
    }

    createOrder = async ({ menuId, userId, storeId, quantity }) => {
        const createdOrder = await this.dataSource.getRepository('Orders').create({
            menuId,
            userId,
            storeId,
            quantity,
        })
        return createdOrder
    }

    cancelOrder = async ({ orderId }) => {
        const canceledOrder = await this.dataSource.getRepository('Orders').delete({
            orderId
        })
    }
}

module.exports = OrdersRepository
