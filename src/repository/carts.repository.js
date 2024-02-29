class CartRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    selectAllCartsByUserId = async (userId) => {
        const carts = await this.dataSource.getRepository("Carts").find({
            where: {
                userId,
            },
            order: {
                createdAt: "desc",
            },
        });
        return carts;
    };

    selectOneCart = async ({ userId, cartId }) => {
        const cart = await this.dataSource.getRepository("Carts").findOne({
            where: {
                cartId,
                userId,
            },
        });
        return cart;
    };

    createCart = async ({ storeId, menuId, userId, quantity }) => {
        const newCart = await this.dataSource.getRepository("Carts").save({
            storeId,
            menuId,
            userId,
            quantity,
        });
        return newCart;
    };

    updateCart = async ({ cartId,  userId, quantity }) => {
        const updatedCart = await this.dataSource
            .getRepository("Carts")
            .update({ cartId, userId }, { quantity });
        return updatedCart;
    };

    deleteCart = async ({ cartId, userId }) => {
        const deletedCart = await this.dataSource
            .getRepository("Carts")
            .delete({
                cartId,
                userId,
            });
        return deletedCart;
    };

    getUserData = async (userId) => {
        const user = await this.dataSource.getRepository("User").findOne({
            where: {
                userId,
            }
        })
        return user;
    }

    orderCart = async ({cartId, userId, menuId, storeId, quantity, location}) => {
        const order = await this.dataSource.getRepository("Orders").save({
            cartId, 
            userId, 
            menuId, 
            storeId, 
            quantity,
            status: "ORDER_WAITING",
            location
        })
        return order;
    }
}

module.exports = CartRepository;
