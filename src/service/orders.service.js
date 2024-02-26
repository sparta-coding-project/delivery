class OrdersService {
    constructer(ordersRepository) {
        this.ordersRepository = ordersRepository
    }

    getOrders = async ({ userId, storeId }) => {
        if (storeId) {
            // store 주문 불러오기
            const storeOrders =
                await this.ordersRepository.selectAllOrdersByStoreId(storeId)
            return storeOrders
        } else {
            // 사용자 별 주문 (사장, 고객 상관 없이)
            const userOrders =
                await this.ordersRepository.selectAllOrdersByUserId(userId)
            return userOrders
        }
    }

    createOrder = async ({ menuId, userId, storeId, quantity }) => {
        const createdOrder = await this.ordersRepository.createOrder({
            menuId,
            userId,
            storeId,
            quantity,
        })
        return createdOrder
    }

    cancelOrder = async ({ orderId }) => {
        const canceledOrder = await this.ordersRepository.cancelOrder({
            orderId,
        })
        return canceledOrder
    }
}
