class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }

    // 새로운 좋아요를 생성하는 메서드
    createLike = async (req, res, next) => {
        try {
            const { userId, storeId } = req.body;

            // 좋아요 생성 서비스 호출
            const createdLike = await this.likeService.createLike(
                userId, // 사용자 ID
                storeId // 가게 ID
            );

            // 성공적으로 생성된 좋아요를 응답으로 반환
            return res.status(201).json({ data: createdLike });
        } catch (err) {
            next(err); // 에러가 발생한 경우 에러 미들웨어로 전달
        }
    };

    // 모든 좋아요를 조회하는 메서드
    getLikes = async (req, res, next) => {
        try {
            // 좋아요 조회 서비스 호출
            const likes = await this.likeService.findAllLike();

            // 조회된 좋아요를 응답으로 반환
            return res.status(200).json({ data: likes });
        } catch (err) {
            next(err); // 에러가 발생한 경우 에러 미들웨어로 전달
        }
    };

    // 좋아요 ID로 특정 좋아요를 조회하는 메서드
    getLikeById = async (req, res, next) => {
        try {
            const { likeId } = req.params;

            // 좋아요 ID를 이용하여 특정 좋아요 조회 서비스 호출
            const like = await this.likeService.findLikeById(likeId);

            // 조회된 좋아요를 응답으로 반환
            return res.status(200).json({ data: like });
        } catch (err) {
            next(err); // 에러가 발생한 경우 에러 미들웨어로 전달
        }
    };

    // 좋아요 수를 조회하는 메서드
    getLikeCount = async (req, res, next) => {
        try {
            // 좋아요 수 조회 서비스 호출
            const likeCount = await this.likeService.countLikes();

            // 조회된 좋아요 수를 응답으로 반환
            return res.status(200).json({ likeCount });
        } catch (err) {
            next(err); // 에러가 발생한 경우 에러 미들웨어로 전달
        }
    };

    // 좋아요를 삭제하는 메서드
    deleteLike = async (req, res, next) => {
        try {
            const { likeId } = req.params;

            // 좋아요 삭제 서비스 호출
            const deletedLike = await this.likeService.deleteLike(likeId);

            // 삭제된 좋아요를 응답으로 반환
            return res.status(200).json({ data: deletedLike });
        } catch (err) {
            next(err); // 에러가 발생한 경우 에러 미들웨어로 전달
        }
    };
}

module.exports = LikeController;
