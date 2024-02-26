class CartRepository {
    constructor(dataSource) {
        this.dataSource = dataSource
    }

    cartsRepo = this.dataSource.getRepository('Carts')

    selectAllCartsByUserId = async (userId) => {
        const carts = await this.cartsRepo.find({
            where: {
                userId,
            },
            order: {
                createdAt: desc,
            },
        })
        return carts
    }

    selectOneCart = async (cartId) => {
        const cart = await this.cartsRepo.findOne({
            where: {
                cartId,
            },
        })
        return cart
    }

    createCart = async ({ menuId, userId, quantity }) => {
        const newCart = await this.cartsRepo.create({
            menuId,
            userId,
            quantity,
        })
        return newCart
    }

    updateCart = async ({ menuId, quantity }) => {
        const updatedCart = await this.cartsRepo.update(
            { menuId },
            { quantity }
        )
        return updatedCart
    }

    deleteCart = async ({cartId}) => {
        const deletedCart = await this.cartsRepo.delete({
            cartId
        });
        return deletedCart;
    }
}
