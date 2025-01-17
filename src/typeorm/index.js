require("dotenv").config();

const typeorm = require("typeorm");
const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: ["src/typeorm/entity/**/*.js"],
    migrations: ["src/typeorm/migrations/**/*.js"],
});

const connectDB = () => {
    dataSource
        .initialize()
        .then(() => console.log("mysql is successfully connected"))
        .catch((error) => console.log(error));
};

const disconnectDB = () => {
    dataSource
        .destroy()
        .then(() => console.log("mysql 연결 해제"))
        .catch((error) => console.log(error));
};

module.exports = { dataSource, connectDB, disconnectDB };
