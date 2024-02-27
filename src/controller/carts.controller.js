class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService
    }

    getCarts = async (req, res, next) => {
        const { userId } = req.body
        const carts = this.cartsService.getCarts({ userId })
        return res
            .status(200)
            .json({ message: '장바구니를 불러왔습니다.', data: carts })
    }
    createCart = async (req, res, next) => {
        const { userId, storeId, menuId, quantity } = req.body
        const newCart = this.cartsService.createCart({
            userId,
            storeId,
            menuId,
            quantity,
        })
        return res
            .status(201)
            .json({ message: '장바구니를 생성했습니다.', data: newCart })
    }
    updateCart = async (req, res, next) => {
        const { cartId } = req.params
        const { userId, quantity } = req.body
        const updatedCart = this.cartsService.updateCart({
            cartId,
            userId,
            quantity,
        })
        return res.status(201).json({
            message: '장바구니를 업데이트 했습니다.',
            data: updatedCart,
        })
    }
    // after orderd OR if user press delete btn
    deleteCart = async (req, res, next) => {
        const { cartId } = req.params
        const { userId } = req.body
        const deletedCart = this.cartsService.deleteCart({
                cartId,
                userId,
        })
        return res
            .status(201)
            .json({ message: '장바구니를 삭제했습니다.', data: deletedCart })
    }
}

module.exports = CartsController
