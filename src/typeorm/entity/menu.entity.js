const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Menu',
    tableName: 'menu',
    columns: {
        menuId: {
            primary: true,
            type: 'int',
            generated: 'increment',
        },
        storeId: {
            type: 'int',
        },
        name: {
            type: 'varchar',
        },
        price: {
            type: 'int',
        },
        description: {
            type: 'text',
        },
        menuImage: {
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
        store: {
            target: 'Store',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },
        orders: {
            target: 'Orders',
            type: 'many-to-many',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
        carts: {
            target: 'Carts',
            type: 'one-to-many',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
    },
})
