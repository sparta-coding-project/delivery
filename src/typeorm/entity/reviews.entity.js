const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Reviews',
    tableName: 'Reviews',
    columns: {
        reviewId: {
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
        title: {
            type: 'varchar',
            unique: true,
        },
        content: {
            type: 'varchar',
            unique: true,
        },
        score: {
            type: 'int',
        },
        image: {
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
