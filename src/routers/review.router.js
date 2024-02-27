const express = require("express");

const router = express.Router();

const ReviewController = require("../controller/review.controller");
const ReviewService = require("../service/review.service");
const ReviewRepository = require("../repository/review.repository");
const { dataSource } = require("../typeorm/index");

const reviewRepository = new ReviewRepository(dataSource);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

router
    .route("/")
    .get(reviewController.getReview) // 리뷰 조회
    .post(reviewController.createReview); // 리뷰 생성

router
    .route("/:reviewId")
    .patch(reviewController.updateReview) //리뷰 수정
    .delete(reviewController.deleteReview); // 리뷰 삭제

module.exports = router;
