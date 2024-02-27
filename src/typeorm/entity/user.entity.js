const EntitySchema = require('typeorm').EntitySchema

const ROLE = {
    BIZ: 'BIZ',
    CUSTOMER: 'CUSTOMER',
}

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
            enum: ROLE,
            nullable: true,
        },
        name: {
            type: 'varchar',
            nullable: true,
        },
        profileImage: {
            type: 'varchar',
            nullable: true,
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
            nullable: true,
        },
    },
})
