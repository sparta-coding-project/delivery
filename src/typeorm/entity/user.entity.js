const EntitySchema = require("typeorm").EntitySchema;

const ROLE = {
    BIZ: "BIZ",
    CUSTOMER: "CUSTOMER",
};

module.exports = new EntitySchema({
    name: "User",
    tableName: "User",
    columns: {
        userId: {
            primary: true,
            type: "int",
            generated: true,
        },
        clientId: {
            type: "varchar",
            nullable: true,
        },
        email: {
            type: "varchar",
            nullable: true,
        },
        password: {
            type: "varchar",
            nullable: true,
        },
        grade: {
            type: "enum",
            enum: ROLE,
            nullable: true,
        },
        name: {
            type: "varchar",
            nullable: true,
        },
        profileImage: {
            type: "varchar",
            nullable: true,
        },
        emailValidation: {
            type: "boolean",
            default: false,
            nullable: true,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
            nullable: true,
        },
    },
    relations: {
        likes: {
            target: "Likes",
            type: "one-to-many",
            joinTable: true,
            joinColumn: { name: "likeId" },
            cascade: true,
        },
        reviews: {
            target: "Reviews",
            type: "one-to-many",
            joinTable: true,
            joinColumn: { name: "reviewId" },
            cascade: true,
        },
        store: {
            target: "Store",
            type: "one-to-many",
            joinTable: true,
            joinColumn: { name: "storeId" },
            cascade: true,
        },
        orders: {
            target: "Orders",
            type: "one-to-many",
            joinTable: true,
            joinColumn: { name: "orderId" },
            cascade: true,
        },
        carts: {
            target: "Carts",
            type: "one-to-many",
            joinTable: true,
            joinColumn: { name: "cartId" },
            cascade: true,
        },
    },
});
