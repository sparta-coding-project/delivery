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
        user: {
            target: 'User',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },
        store: {
            target: 'Store',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: { name: 'storeId' },
            cascade: true,
        },
    },
})
