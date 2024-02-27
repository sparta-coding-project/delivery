const express = require('express')
const jwtValidate = require('../middleware/jwt-validate.middleware')
const reviewController = require('../src/controller/review.controller')

const router = express.Router()

router.post('/', reviewController.createReview) // 리뷰 생성
router.get('/', reviewController.getReview) // 리뷰 조회
router.patch('/:reviewId', reviewController.updateReview) // 리뷰 수정
router.delete('/:reviewId', reviewController.deleteReview) // 리뷰 삭제

module.exports = router
