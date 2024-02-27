const express = require('express')
const jwtValidate = require('../middleware/jwt-validate.middleware')
const storeController = require('../src/controller/store.controller')
const router = express.Router()

router.get('/', storeController.findAllStores)

router.get('/:storeId', storeController.findOneStore)

router.post('/', jwtValidate, storeController.createStore)

router.patch('/:storeId', jwtValidate, storeController.updateStore)

router.delete('/:storeId', jwtValidate, storeController.deleteStore)

module.exports = router
