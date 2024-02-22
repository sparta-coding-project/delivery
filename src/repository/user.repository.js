const { dataSource } = require('../typeorm')

class UserRepository {
    findOneUserByUserId = async (userId) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                userId,
            },
        })

        return user
    }

    selectOneUserByClientId = async (clientId) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                clientId,
            },
        })
        return user
    }

    selectOneUserByEmail = async (email) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                email,
            },
        })
        return user
    }

    selectOneUserByEmailAndPassword = async (email, password) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                email,
                password,
            },
        })
        return user
    }

    createUser = async (data) => {
        await dataSource.getRepository('User').insert(data)
    }
}

const userRepository = new UserRepository()
module.exports = userRepository
