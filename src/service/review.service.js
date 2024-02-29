class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    findAllReview = async () => {
        const reviews = await this.reviewRepository.findAllReview();
        // 리뷰 생성 날짜로 부터 내림차순 정렬
        reviews.sort((a, b) => {
            return b.createAt - a.createdAt;
        });

        // password, content 를 뺀 상태로, Controller에게 Response전달
        return reviews.map((review) => {
            return {
                reviewId: review.reviewId,
                title: review.title,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            };
        });
    };

    findReviewById = async (reviewId) => {
        const review = await this.reviewRepository.findReviewById(reviewId);

        return {
            reviewId: review.reviewId,
            nickname: review.nickname,
            title: review.title,
            content: review.content,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    };

    createReview = async (userId, title, content) => {
        const createdReview = await this.reviewRepository.createReview(
            userId,
            title,
            content
        );

        return {
            reviewId: createdReview.reviewId,
            title: createdReview.title,
            content: createdReview.content,
            score: createdReview.score,
            image: createdReview.image,
            createdAt: createdReview.createdAt,
            updatedAt: createdReview.updatedAt,
        };
    };

    updateReview = async (reviewId, password, title, content) => {
        const review = await this.reviewRepository.findReviewById(reviewId);
        if (!review) throw new Error("존재하지 않는 리뷰입니다.");

        await this.reviewRepository.updateReview(
            reviewId,
            password,
            title,
            content
        );

        const updatedReview = await this.reviewRepository.findReviewById(
            reviewId
        );

        return {
            reviewId: updatedReview.reviewId,
            title: updatedReview.title,
            content: updatedReview.content,
            score: updatedReview.score,
            image: updatedReview.image,
            createdAt: updatedReview.createdAt,
            updatedAt: updatedReview.updatedAt,
        };
    };

    deleteReview = async (reviewId, password) => {
        const review = await this.reviewRepository.findReviewById(reviewId);
        if (!review) throw new ErrorEvent("존재하지 않는 리뷰입니다.");

        await this.reviewRepository.deleteReview(reviewId, password);

        return {
            reviewId: review.reviewId,
            title: review.title,
            content: review.content,
            score: review.score,
            image: review.image,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    };
}

module.exports = ReviewService;
