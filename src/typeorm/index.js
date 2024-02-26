require('dotenv').config()

const DataSource = require('typeorm').DataSource

const dataSource = new DataSource({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    synchronize: true,
    entities: ['src/typeorm/entity/**/*.js'],
    migrations: ['src/typeorm/migrations/**/*.js'],
    cli: {
        migrationsDir: './migrations',
    },
})

const connectDB = () => {
    dataSource
        .initialize()
        .then(() => console.log('mysql is successfully connected'))
        .catch((error) => console.log(error))
}

const disconnectDB = () => {
    dataSource
        .destroy()
        .then(() => console.log('mysql 연결 해제'))
        .catch((error) => console.log(error))
}

module.exports = { dataSource, connectDB, disconnectDB }
