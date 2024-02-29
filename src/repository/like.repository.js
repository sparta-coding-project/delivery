const { dataSource } = require('../typeorm')

class LikeRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    // 모든 좋아요를 조회하는 메서드
    findAllLike = async () => {
        const likes = await this.dataSource.likes.findMany();
        return likes;
    };
    // 좋아요 ID로 특정 좋아요를 조회하는 메서드
    findLikeById = async (likeId) => {
        const like = await this.dataSource.likes.findUnique({
            where: { likeId: +likeId },
        });
        return like;
    };
    // 새로운 좋아요를 생성하는 메서드
    createLike = async (userId, storeId) => {
        const createdLike = await this.dataSource.likes.create({
            data: {
                userId,
                storeId,
            },
        });
        return createdLike;
    };

    countLikes = async () => {
        // 전체 좋아요 수 count
        const count = await this.dataSource.likes.count();
        return count;
    };

    deleteLike = async (likeId) => {
        const deletedLike = await this.dataSource.likes.delete({
            where: {
                likeId: +likeId,
            },
        });
        return deletedLike;
    };
}

module.exports = LikeRepository;