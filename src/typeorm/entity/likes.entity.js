const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Likes',
    tableName: 'Likes',
    columns: {
        likeId: {
            primary: true,
            type: 'int',
            generated: 'increment',
        },
        storeId: {
            type: 'int',
        },
        userId: {
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
        stores: {
            target: 'Stores',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },
    },
})
