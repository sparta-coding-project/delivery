const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: 'Carts',
    tableName: 'Carts',
    columns: {
        likeId: {
            primary: true,
            type: 'int',
            generated: true,
            unique: true
        },
        storeId: {
            type: "int"
        },
        userId: {
            type: "int"
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
        stores:{
            target: "Stores",
            type: "many-to-one",
            joinTable: true,
            joinColumn: { name: "storeId" },
            cascade: true
        }
    },
})