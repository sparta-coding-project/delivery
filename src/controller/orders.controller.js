class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService
    }
    getOrders = async (req, res, next) => {
        try {
            const { userId, storeId } = req.body
            await this.ordersService.getOrders({ userId, storeId })
            return res.status(200).json({ message: '주문을 불러왔습니다.' })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error })
        }
    } //
    createOrder = async (req, res, next) => {
        try {
            const { menuId, userId, storeId } = req.body
            await this.ordersService.createOrder({
                menuId,
                userId,
                storeId,
                quantity,
            })
            return res.status(201).json({ message: '주문을 완료했습니다.' })
        } catch (error) {
            return res.status(401).json({ error: error })
        }
    } // quantity, menuId, userId, storeId 필요
    cancelOrder = async (req, res, next) => {
        try {
            const { orderId } = req.body
            await this.ordersService.cancelOrder({ orderId });
            return res.status(201).json({ message: '주문을 취소했습니다.' })
        } catch (error) {
            return res.status(401).json({ error: error })
        }
    } //
}

module.exports = OrdersController
