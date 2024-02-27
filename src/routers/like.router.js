const express = require("express");
const LikeController = require("./controller/like.controller");
const LikeService = require("./service/like.service");
const LikeRepository = require("./repository/like.repository");
const { dataSource } = require("../typeorm/index");

const router = express.Router();

const likeController = new LikeController(likeService);
const likeService = new LikeService(likeRepository);
const likeRepository = new LikeRepository(dataSource);

// 좋아요 기능
router
    .route("/reviews/:reviewId/stores/:storeId/likes")
    .get(likeController.getLikes) // 모든 좋아요 조회
    .post(likeController.createLike) // 새로운 좋아요 생성
    .delete(likeController.deleteLike); // 좋아요 삭제
router
    .route("/reviews/:reviewId/stores/:storeId/likeCount")
    .get(likeController.getLikeCount); // 좋아요 수 조회
module.exports = router;
