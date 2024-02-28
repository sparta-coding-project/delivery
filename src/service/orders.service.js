class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    getOrders = async ({ userId, storeId }) => {
        if (storeId) {
            console.log("store 주문");
            const ownedStore = await this.ordersRepository.getOwnedStore({
                userId,
                storeId,
            });
            if (ownedStore) {
                const storeOrders =
                    await this.ordersRepository.selectAllOrdersByStoreId(
                        storeId
                    );
                return storeOrders;
            } else {
                throw {
                    message: "잘못된 접근입니다.",
                };
            }
            // store 주문 불러오기
        } else {
            // 사용자 별 주문 (사장, 고객 상관 없이)
            const userOrders =
                await this.ordersRepository.selectAllOrdersByUserId(userId);
            if (userOrders.length > 0) {
                return userOrders;
            } else {
                throw {
                    message: "주문 정보가 없습니다.",
                };
            }
        }
    };

    createOrder = async ({ menuId, userId, storeId, quantity }) => {
        const createdOrder = await this.ordersRepository.createOrder({
            menuId,
            userId,
            storeId,
            quantity,
        });
        return createdOrder;
    };

    cancelOrder = async ({ orderId }) => {
        const canceledOrder = await this.ordersRepository.cancelOrder({
            orderId,
        });
        return canceledOrder;
    };
}

module.exports = OrdersService;
