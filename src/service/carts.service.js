class CartsService {
    constructor(cartsRepository) {
        this.cartsRepository = cartsRepository;
    }

    getAllCarts = async ({ userId }) => {
        const carts = await this.cartsRepository.selectAllCartsByUserId(userId);
        return carts;
    };

    getOneCart = async ({ userId, cartId }) => {
        const carts = await this.cartsRepository.selectOneCart({
            userId,
            cartId,
        });
        return carts;
    };

    createCart = async ({ userId, storeId, menuId, quantity }) => {
        const newCart = await this.cartsRepository.createCart({
            userId,
            storeId,
            menuId,
            quantity,
        });
        return newCart;
    };

    updateCart = async ({ cartId, userId, quantity }) => {
        const updatedCart = await this.cartsRepository.updateCart({
            cartId,
            userId,
            quantity,
        });
        return updatedCart;
    };
    deleteCart = async ({ cartId, userId }) => {
        const deletedCart = await this.cartsRepository.deleteCart({
            cartId,
            userId,
        });
        return deletedCart;
    };
    orderCart = async ({ userId }) => {
        const user = await this.cartsRepository.getUserData(userId);
        const carts = await this.cartsRepository.selectAllCartsByUserId(userId);

        if (carts.length > 0) {
            const orders = Promise.all(
                carts.map(async (cart) => {
                    const orderedCart = await this.cartsRepository.orderCart({
                        menuId: cart.menuId,
                        storeId: cart.storeId,
                        userId: cart.userId,
                        cartId: cart.cartId,
                        quantity: cart.quantity,
                        location: user.location,
                    });
                    await this.cartsRepository.deleteCart({
                        userId,
                        cartId: cart.cartId,
                    });
                    return orderedCart
                })
            );
            return orders;
        } else {
            throw {
                message: "주문 내역이 없습니다.",
            };
        }
    };
}

module.exports = CartsService;
