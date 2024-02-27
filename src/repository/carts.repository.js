class CartRepository {
    constructor(dataSource) {
        this.dataSource = dataSource
    }

    selectAllCartsByUserId = async (userId) => {
        const carts = await this.dataSource.getRepository('Carts').find({
            where: {
                userId,
            },
            order: {
                createdAt: "desc",
            },
        })
        return carts
    }

    selectOneCart = async ({userId, cartId}) => {
        const cart = await this.dataSource.getRepository('Carts').findOne({
            where: {
                cartId,
                userId
            },
        })
        return cart
    }

    createCart = async ({ menuId, userId, quantity }) => {
        const newCart = await this.dataSource.getRepository('Carts').create({
            menuId,
            userId,
            quantity,
        })
        return newCart
    }

    updateCart = async ({ menuId, quantity }) => {
        const updatedCart = await this.dataSource.getRepository('Carts').update(
            { cartId, userId },
            { quantity }
        )
        return updatedCart
    }

    deleteCart = async ({cartId}) => {
        const deletedCart = await this.dataSource.getRepository('Carts').delete({
            cartId, userId
        });
        return deletedCart;
    }
}

module.exports = CartRepository