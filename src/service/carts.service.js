class CartsService {
    constructor(cartsRepository) {
        this.cartsRepository = cartsRepository
    }

    getAllCarts = async ({ userId }) => {
        const carts = await this.cartsRepository.selectAllCartsByUserId(userId)
        return carts
    }

    getOneCart = async ({userId, cartId}) => {
        const carts = await this.cartsRepository.selectOneCart({userId, cartId});
        return carts
    }

    createCart = async ({ userId, storeId, menuId, quantity }) => {
        const newCart = await this.cartsRepository.createCart({
            userId,
            storeId,
            menuId,
            quantity,
        })
        return newCart
    }

    updateCart = async ({ cartId, userId, quantity }) => {
        const updatedCart = await this.cartsRepository.updateCart({
            cartId,
            userId,
            quantity,
        })
        return updatedCart
    }
    deleteCart = async ({cartId, userId}) => {
        const deletedCart = await this.cartsRepository.deleteCart({
            cartId, userId
        })
        return deletedCart;
    }
}

module.exports = CartsService
