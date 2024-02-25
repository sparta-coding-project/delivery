const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Store',
    tableName: 'store',
    columns: {
        storeId: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
        },
        menuId: {
            type: 'int',
        },
        orderId: {
            type: 'int',
        },
        reviewId: {
            type: 'int',
        },
        intro: {
            type: 'text',
        },
        storeImage: {
            type: 'varchar',
        },
        location: {
            type: 'varchar',
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
    relations: {
        User: {
            target: 'user',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },
        menu: {
            target: 'Menu',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
        orders: {
            target: 'Orders',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'orderId' },
            cascade: true,
        },
        reviews: {
            target: 'Reviews',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'reviewId' },
            cascade: true,
        },
    },
})
