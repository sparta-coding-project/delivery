const storeService = require('../service/store.service.js')

class StoreController {
    findAllStores = async (req, res) => {
        try {
            const orderKey = req.query.orderKey ?? 'storeId'
            const orderValue = req.query.orderValue ?? 'desc'

            if (!['storeId', 'name'].includes(orderKey)) {
                return res.status(400).json({
                    success: false,
                    message: 'orderKey 가 올바르지 않습니다.',
                })
            }

            if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
                return res.status(400).json({
                    success: false,
                    message: 'orderValue 가 올바르지 않습니다.',
                })
            }

            // database 영역 - service를 통해서 respository 접근하셈
            const stores = await storeService.findAllSortedStores({
                orderKey,
                ordervalue: orderValue.toLowerCase(),
            })

            return res.json({ data: stores })
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

    findOneStore = async (req, res) => {
        try {
            const storeId = req.params.storeId
            if (!storeId) {
                return res.status(400).json({
                    success: false,
                    message: 'storeId는 필수값입니다.',
                })
            }

            const store = await storeService.findOneStoreByStoreId(storeId)

            if (!store) {
                return res.json({ data: {} })
            }

            return res.json({ data: store })
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

    createStore = async (req, res) => {
        try {
            const user = res.locals.user
            const { name, intro, storeImage, location } = req.body
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: '식당 이름은 필수값 입니다',
                })
            }

            await storeService.createStore({
                name,
                intro,
                storeImage,
                location,
                userId: user.userId,
            })

            if (!intro) {
                return res.status(400).json({
                    success: false,
                    message: '식당소개는 필수값 입니다',
                })
            }

            if (!location) {
                return res.status(400).json({
                    success: false,
                    message: '식당 주소는 필수값 입니다',
                })
            }

            return res.status(201).end()
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

    updateStore = async (req, res) => {
        try {
            const user = res.locals.user
            const storeId = req.params.storeId
            const { name, intro, storeImage, location } = req.body

            if (!storeId) {
                return res.status(400).json({
                    success: false,
                    message: 'storeId 는 필수값입니다',
                })
            }

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: '식당 이름은 필수값입니다',
                })
            }

            if (!intro) {
                return res.status(400).json({
                    success: false,
                    message: '식당소개는 필수값입니다',
                })
            }

            if (!location) {
                return res.status(400).json({
                    success: false,
                    message: '식당 주소는 필수값입니다',
                })
            }

            await storeService.updateStoreByStoreId(
                storeId,
                { name, intro, storeImage, location },
                user
            )

            return res.status(201).end()
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

    deleteStore = async (req, res) => {
        try {
            const user = res.locals.user
            const storeId = req.params.storeId

            if (!storeId) {
                return res.status(400).json({
                    success: false,
                    message: 'storeId 는 필수값입니다',
                })
            }

            await storeService.deleteStoreByStoreId(storeId, user)

            return res.status(201).end()
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }
}

const storeController = new StoreController()
module.exports = storeController
