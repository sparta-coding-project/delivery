const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Reviews',
    tableName: 'Reviews',
    columns: {
        reviewId: {
            primary: true,
            type: 'int',
            generated: true,
            unique: true
        },
        storeId: {
            type: "int"
        },
        userId: {
            type: 'int',
        },
        title: {
            type: 'varchar',
            unique: true,
        },
        content: {
            type: 'varchar',
            unique:true,
        },
        score: {
            type: "int",
        },
        image: {
            type: "varchar",
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
        stores: {
            target: "Stores",
            type: "many-to-one",
            joinTable: true,
            joinColumn: { name: "storeId" },
            cascade: true
        }
    },
})
