const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Carts',
    tableName: 'Carts',
    columns: {
        cartId: {
            primary: true,
            type: 'int',
            generated: 'increment',
        },
        userId: {
            type: 'int',
        },
        menuId: {
            type: 'int',
        },
        quantity: {
            type: 'int',
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
        users: {
            target: 'Users',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },
        menu: {
            target: 'Menu',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'menuId' },
            cascade: true,
        },
    },
})
