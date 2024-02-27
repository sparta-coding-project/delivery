const express = require('express')
const likeController = require('../src/controller/like.controller')
const router = express.Router()
// 좋아요 기능
router.post('/reviews/:reviewId/stores/:storeId/likes',likeController) 


module.exports = router