class OrdersRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    getOwnedStore = async ({ userId, storeId }) => {
        const ownedStore = this.dataSource.getRepository("store").findOne({
            where: { userId, storeId },
        });
        return ownedStore;
    };

    selectAllOrdersByStoreId = async (storeId) => {
        const orders = await this.dataSource
            .getRepository("Orders")
            .find({ where: { storeId } });
        return orders;
    };

    selectAllOrdersByUserId = async (userId) => {
        const orders = await this.dataSource
            .getRepository("Orders")
            .find({ where: { userId } });
        return orders;
    };

    createOrder = async ({ menuId, userId, storeId, quantity }) => {
        const createdOrder = await this.dataSource
            .getRepository("Orders")
            .create({
                menuId,
                userId,
                storeId,
                quantity,
            });
        return createdOrder;
    };

    cancelOrder = async ({ orderId }) => {
        const canceledOrder = await this.dataSource
            .getRepository("Orders")
            .delete({
                orderId,
            });
    };
}

module.exports = OrdersRepository;
