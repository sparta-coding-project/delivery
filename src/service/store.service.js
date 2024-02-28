const storeRepository = require("../repository/store.repository");

class StoreService {
    findAllSortedStores = async (sort) => {
        const stores = await storeRepository.selectAllSortedStores(sort);
        return stores;
    };

    findOneStoreByStoreId = async (storeId) => {
        const store = await storeRepository.selectOneStoreByStoreId(storeId);
        return store;
    };

    createStore = async ({
        name,
        intro,
        storeImage,
        location,
        userId,
        menuId,
        reviewId,
        orderId,
    }) => {
        await storeRepository.createStore({
            name,
            intro,
            storeImage,
            location,
            userId,
        });
    };

    updateStoreByStoreId = async (storeId, data, byUser) => {
        const store = await storeRepository.selectOneStoreByStoreId(storeId);

        if (!store) {
            throw {
                code: 401,
                message: "존재하지 않는 식당입니다.",
            };
        }

        if (byUser.grade === "BIZ" && store.userId !== byUser.userId) {
            throw {
                code: 401,
                message: "올바르지 않은 요청입니다.",
            };
        }

        await storeRepository.updateStoreByStoreId(storeId, data);
    };

    deleteStoreByStoreId = async (storeId, byUser) => {
        const store = await storeRepository.selectOneStoreByStoreId(storeId);

        if (!store) {
            throw {
                code: 400,
                message: "존재하지 않는 식당입니다.",
            };
        }

        if (store.userId !== byUser.userId) {
            throw {
                code: 400,
                message: "올바르지 않은 요청입니다.",
            };
        }

        await storeRepository.deleteStoreByStoreId(storeId);
    };
}

const storeService = new StoreService();
module.exports = storeService;
