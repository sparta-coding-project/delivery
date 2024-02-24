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
        storedId: {
            type: 'int',
        },
        menuId: {
            type: 'int',
        },
        status: {
            type: 'enum',
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
    },
    relations: {
        store: {
            target: 'Stores',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },
    },
    relations: {
        menu: {
            target: 'menu',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
    },
})
