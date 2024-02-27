require('dotenv').config()

const typeorm = require('typeorm')
const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [
        require('./entity/user.entity'),
        require('./entity/store.entity'),
    ],
})

if (process.env.NODE_ENV !== 'test') {
    dataSource
        .initialize()
        .then(() => console.log('mysql is successfully connected'))
        .catch((error) => console.log(error))
}

module.exports = { dataSource }
