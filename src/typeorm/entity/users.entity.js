const EntitySchema = require('typeorm').EntitySchema

const ROLE = {
    BIZ: "BIZ",
    CUSTOMER: "CUSTOMER"
}

module.exports = new EntitySchema({
    name: 'Users',
    tableName: 'Users',
    columns: {
        userId: {
            primary: true,
            type: 'int',
            generated: true,
        },
        clientId: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
        },
        password: {
            type: 'varchar',
        },
        nickname: {
            type: 'varchar',
        },
        type: {
            type: 'enum',
            enum: ROLE,
        },
        name: {
            type: 'varchar',
        },
        profileImage: {
            type: 'varchar',
        },
        createdAt: {
            type: 'datetime',
        },
        updatedAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
    relations: {
        likes: {
            target: 'Likes',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'likeId' },
            cascade: true,
        },
        reviews: {
            target: 'Reviews',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'reviewId' },
            cascade: true,
        },
        stores: {
            target: 'Stores',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },
        orders: {
            target: 'Orders',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'orderId' },
            cascade: true,
        },
        carts: {
            target: 'Carts',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'cartId' },
            cascade: true,
        },
    }
})
