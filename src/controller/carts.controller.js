class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }

    getAllCarts = async (req, res, next) => {
        try {
            const { userId } = req.body;
            const carts = await this.cartsService.getAllCarts({ userId });
            return res
                .status(200)
                .json({ message: "장바구니를 불러왔습니다.", data: carts });
        } catch (error) {
            return res
                .status(200)
                .json({ errorMessage: "장바구니 불러오기를 실패했습니다" });
        }
    };

    getOneCart = async (req, res, next) => {
        try {
            const { userId } = req.body;
            const { cartId } = req.params;
            const cart = await this.cartsService.getOneCart({
                userId,
                cartId,
            });
            return res
                .status(200)
                .json({ message: "장바구니를 불러왔습니다.", data: cart });
        } catch (error) {
            return res
                .status(200)
                .json({ errorMessage: "장바구니 불러오기를 실패했습니다" });
        }
    };
    createCart = async (req, res, next) => {
        try {
            const { userId, storeId, menuId, quantity } = req.body;
            const newCart = await this.cartsService.createCart({
                userId,
                storeId,
                menuId,
                quantity,
            });
            return res
                .status(201)
                .json({ message: "장바구니를 생성했습니다.", data: newCart });
        } catch (error) {
            console.log(error)
            return res
                .status(401)
                .json({ errorMessage: "장바구니 생성에 실패했습니다." });
        }
    };
    updateCart = async (req, res, next) => {
        try {
            const { cartId } = req.params;
            const { userId, quantity } = req.body;
            const updatedCart = await this.cartsService.updateCart({
                cartId,
                userId,
                quantity,
            });
            return res.status(201).json({
                message: "장바구니를 업데이트 했습니다.",
                data: updatedCart,
            });
        } catch (error) {
            return res.status(401).json({
                errorMessage: "장바구니 업데이트에 실패했습니다",
            });
        }
    };
    // after orderd OR if user press delete btn
    deleteCart = async (req, res, next) => {
        try {
            const { cartId } = req.params;
            const { userId } = req.body;
            const deletedCart = await this.cartsService.deleteCart({
                cartId,
                userId,
            });
            return res
                .status(201)
                .json({
                    message: "장바구니를 삭제했습니다.",
                    data: deletedCart,
                });
        } catch (error) {
            return res
                .status(401)
                .json({ message: "장바구니 삭제에 실패했습니다." });
        }
    };
}

module.exports = CartsController;
