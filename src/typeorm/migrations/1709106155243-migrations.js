const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1709106155243 {
    name = 'Migrations1709106155243'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`User\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`clientId\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`grade\` enum ('BIZ', 'CUSTOMER') NULL, \`name\` varchar(255) NULL, \`profileImage\` varchar(255) NULL, \`emailValidation\` tinyint NULL DEFAULT 0, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`store\` (\`storeId\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`menuId\` int NOT NULL, \`orderId\` int NOT NULL, \`reviewId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`intro\` text NOT NULL, \`storeImage\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`storeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Reviews\` (\`reviewId\` int NOT NULL AUTO_INCREMENT, \`storeId\` int NOT NULL, \`userId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_55464746adc8aae273ecc62e28\` (\`title\`), UNIQUE INDEX \`IDX_747541a1ba50492151eabf1183\` (\`content\`), PRIMARY KEY (\`reviewId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Orders\` (\`orderId\` int NOT NULL AUTO_INCREMENT, \`cartId\` int NULL, \`userId\` int NOT NULL, \`storeId\` int NULL, \`menuId\` int NOT NULL, \`status\` enum ('ORDER_WAITING', 'ORDER_PREPARING', 'DELIVERY_STARTED', 'DELIVERY_COMPLETED') NOT NULL, \`location\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`field\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`orderId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu\` (\`menuId\` int NOT NULL AUTO_INCREMENT, \`storeId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` text NOT NULL, \`menuImage\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`menuId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Likes\` (\`likeId\` int NOT NULL AUTO_INCREMENT, \`storeId\` int NOT NULL, \`userId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`likeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Carts\` (\`cartId\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`menuId\` int NOT NULL, \`storeId\` int NOT NULL, \`quantity\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cartId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_orders_orders\` (\`menuMenuId\` int NOT NULL, \`ordersOrderId\` int NOT NULL, INDEX \`IDX_6d5473de58bcdf6b14eeeed20d\` (\`menuMenuId\`), INDEX \`IDX_d81bb331d68a7bf6e655a2cea1\` (\`ordersOrderId\`), PRIMARY KEY (\`menuMenuId\`, \`ordersOrderId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_3f82dbf41ae837b8aa0a27d29c3\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reviews\` ADD CONSTRAINT \`FK_03697b4cf2383ce44b9b0ac3fda\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reviews\` ADD CONSTRAINT \`FK_81ec792746769be93b8cd997bde\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`storeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Orders\` ADD CONSTRAINT \`FK_cc257418e0228f05a8d7dcc5553\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Orders\` ADD CONSTRAINT \`FK_2565c24236e61539c06f970ad1e\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`storeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Orders\` ADD CONSTRAINT \`FK_abb11e065bb02a062e221648de1\` FOREIGN KEY (\`menuId\`) REFERENCES \`menu\`(\`menuId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_266438f8f09ba25d8ebbb9f9310\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`storeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Likes\` ADD CONSTRAINT \`FK_eb14edaf42c147177b6f90ebf0c\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Likes\` ADD CONSTRAINT \`FK_6a42363fff05d4e714b5d6f0c38\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`storeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Carts\` ADD CONSTRAINT \`FK_8c26b3de964f6e854a22b7e3293\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Carts\` ADD CONSTRAINT \`FK_1f2f50efcfba74d8d134ead7d6b\` FOREIGN KEY (\`menuId\`) REFERENCES \`menu\`(\`menuId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Carts\` ADD CONSTRAINT \`FK_008347575d16faab30e2ad091c0\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`storeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_orders_orders\` ADD CONSTRAINT \`FK_6d5473de58bcdf6b14eeeed20da\` FOREIGN KEY (\`menuMenuId\`) REFERENCES \`menu\`(\`menuId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu_orders_orders\` ADD CONSTRAINT \`FK_d81bb331d68a7bf6e655a2cea13\` FOREIGN KEY (\`ordersOrderId\`) REFERENCES \`Orders\`(\`orderId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menu_orders_orders\` DROP FOREIGN KEY \`FK_d81bb331d68a7bf6e655a2cea13\``);
        await queryRunner.query(`ALTER TABLE \`menu_orders_orders\` DROP FOREIGN KEY \`FK_6d5473de58bcdf6b14eeeed20da\``);
        await queryRunner.query(`ALTER TABLE \`Carts\` DROP FOREIGN KEY \`FK_008347575d16faab30e2ad091c0\``);
        await queryRunner.query(`ALTER TABLE \`Carts\` DROP FOREIGN KEY \`FK_1f2f50efcfba74d8d134ead7d6b\``);
        await queryRunner.query(`ALTER TABLE \`Carts\` DROP FOREIGN KEY \`FK_8c26b3de964f6e854a22b7e3293\``);
        await queryRunner.query(`ALTER TABLE \`Likes\` DROP FOREIGN KEY \`FK_6a42363fff05d4e714b5d6f0c38\``);
        await queryRunner.query(`ALTER TABLE \`Likes\` DROP FOREIGN KEY \`FK_eb14edaf42c147177b6f90ebf0c\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_266438f8f09ba25d8ebbb9f9310\``);
        await queryRunner.query(`ALTER TABLE \`Orders\` DROP FOREIGN KEY \`FK_abb11e065bb02a062e221648de1\``);
        await queryRunner.query(`ALTER TABLE \`Orders\` DROP FOREIGN KEY \`FK_2565c24236e61539c06f970ad1e\``);
        await queryRunner.query(`ALTER TABLE \`Orders\` DROP FOREIGN KEY \`FK_cc257418e0228f05a8d7dcc5553\``);
        await queryRunner.query(`ALTER TABLE \`Reviews\` DROP FOREIGN KEY \`FK_81ec792746769be93b8cd997bde\``);
        await queryRunner.query(`ALTER TABLE \`Reviews\` DROP FOREIGN KEY \`FK_03697b4cf2383ce44b9b0ac3fda\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_3f82dbf41ae837b8aa0a27d29c3\``);
        await queryRunner.query(`DROP INDEX \`IDX_d81bb331d68a7bf6e655a2cea1\` ON \`menu_orders_orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d5473de58bcdf6b14eeeed20d\` ON \`menu_orders_orders\``);
        await queryRunner.query(`DROP TABLE \`menu_orders_orders\``);
        await queryRunner.query(`DROP TABLE \`Carts\``);
        await queryRunner.query(`DROP TABLE \`Likes\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
        await queryRunner.query(`DROP TABLE \`Orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_747541a1ba50492151eabf1183\` ON \`Reviews\``);
        await queryRunner.query(`DROP INDEX \`IDX_55464746adc8aae273ecc62e28\` ON \`Reviews\``);
        await queryRunner.query(`DROP TABLE \`Reviews\``);
        await queryRunner.query(`DROP TABLE \`store\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }
}
