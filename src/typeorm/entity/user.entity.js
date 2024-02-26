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
            nullable: true,
        },
        email: {
            type: 'varchar',
            nullable: true,
        },
        password: {
            type: 'varchar',
            nullable: true,
        },
        grade: {
            type: 'varchar',
            nullable: true,
        },
        name: {
            type: 'varchar',
            nullable: true,
        },
        createdAt: {
            type: 'datetime',
            nullable: true,
        },
    },
})
