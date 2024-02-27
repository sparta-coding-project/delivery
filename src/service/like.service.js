class LikeService {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }

    findAllLike = async () => {
        const likes = await this.likeRepository.findAllLike();
        // 좋아요 한 날짜로 부터 내림차순 정렬
        reviews.sort((a, b) => {
            return b.createAt - a.createdAt;
        });

        //  Controller에게 Response전달
        return likes.map((like) => {
            return {
                likeId: like.likeId,
                createdAt: like.createdAt,
                updatedAt: like.updatedAt,
            };
        });
    };

    findLikeById = async (likeId) => {
        const like = await this.likeRepository.findLikeById(likeId);
        return { likeId };
    };

    createLike = async (userId, storeId) => {
        // 새로운 좋아요 생성
        const newLike = {
            userId: userId,
            storeId: storeId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        // 생성된 좋아요를 저장소에 추가
        const createdLike = await this.likeRepository.createLike(newLike);
        return createdLike;
    };

    countLikes = async () => {
        // 전체 좋아요 수 count
        const count = await this.likeRepository.countLikes();
        return count;
    };

    deleteLike = async (likeId) => {
        // 좋아요 삭제
        const deletedLike = await this.likeRepository.deleteLike(likeId);
        return deletedLike;
    };
}

module.exports = LikeService;
