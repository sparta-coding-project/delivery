const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        userId: {
            primary: true,
            type: 'int',
            generated: true,
        },
        clientId: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
        },
        password: {
            type: 'varchar',
        },
        nickname: {
            type: 'varchar',
        },
        type: {
            type: 'varchar',
            enum: ['user', 'biz'],
        },
        name: {
            type: 'varchar',
        },
        profileImage: {
            type: 'varchar',
        },
        createdAt: {
            type: 'datetime',
        },
        updatedAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
})
