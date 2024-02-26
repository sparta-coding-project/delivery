const { dataSource } = require('../typeorm')

class StoreRepository {
    selectAllSortedStores = async (sort) => {
        const stores = await dataSource.getRepository('Store').find({
            select: {
                storeId: true,
                name: true,
                // intro: true,
                // location: true,
                storeImage: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
            order: {
                [sort.orderKey]: sort.orderValue,
            },
        })
        return stores
    }

    selectOneStoreByStoreId = async (storeId) => {
        const store = await dataSource.getRepository('Store').findOne({
            where: {
                storeId: +storeId,
            },
            select: {
                storeId: true,
                name: true,
                intro: true,
                location: true,
                storeImage: true,
                userId: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
        })
        return store
    }

    createStore = async (data) => {
        await dataSource.getRepository('Store').insert(data)
    }

    updateStoreByStoreId = async (storeId, data) => {
        await dataSource
            .getRepository('Store')
            .update({ storeId: +storeId }, data)
    }

    deleteStoreByStoreId = async (storeId) => {
        await dataSource.getRepository('Store').delete({
            storeId: +storeId,
        })
    }
}

const storeRepository = new StoreRepository()
module.exports = storeRepository
