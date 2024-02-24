const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: 'Carts',
    tableName: 'Carts',
    columns: {
        cartId: {
            primary: true,
            type: 'int',
            generated: true,
            unique: true
        },
        userId: {
            type: "int"
        },
        menuId: {
            type: 'int',
        },
        quantity: {
            type:"int",
        },
        createdAt: {
            type: 'datetime',
        },
        updatedAt: {
            type: "datetime"
        }
    },
    relations: {
        users: {
            target: 'Users',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },
        menu:{
            target: "Menu",
            type: "many-to-one",
            joinTable: true,
            joinColumn: { name: "menuId" },
            cascade: true
        }
    },
})
