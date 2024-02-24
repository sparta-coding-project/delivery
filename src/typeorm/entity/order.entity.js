const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Order',
    tableName: 'Orders',
    columns: {
        orderId: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
        },
        storeId: {
            type: 'int',
        },
        menuId: {
            type: 'int',
        },
        status: {
            type: 'enum',
            enum: ['상품 준비중', '배송중', '배송완료'],
        },
        location: {
            type: 'varchar',
        },
        amount: {
            type: 'int',
        },
        field: {
            type: 'varchar',
        },
    },
    relations: {
        user: {
            target: 'Users',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },

        store: {
            target: 'Stores',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },

        menu: {
            target: 'menu',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
    },
})
