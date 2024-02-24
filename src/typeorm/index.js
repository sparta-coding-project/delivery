require('dotenv').config()

const typeorm = require('typeorm')

const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    synchronize: false,
    entities: [
        require('./entity/user.entity'),
        require('./entity/resume.entity'),
    ],
})

if (process.env.NODE_ENV !== 'test') {
    dataSource.initialize()
}

module.exports = { dataSource }
