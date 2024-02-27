const { dataSource } = require('../typeorm')
class ReviewRepository {
    findAllReview = async () => {
        const reviews = await dataSource.reviews.findMany()
        return reviews
    }

    findReviewById = async (reviewId) => {
        const review = await dataSource.reviews.findUnique({
            where: { reviewId: +reviewId },
        })
        return review
    }

    createReview = async (userId, title, content) => {
        const createdReview = await dataSource.reviews.create({
            data: {
                userId,
                title,
                content,
            },
        })
        return createdReview
    }

    updateReview = async (reviewId, password, title, content) => {
        const updatedReview = await dataSource.reviews.updated({
            where: {
                reviewId: +reviewId,
                password: password,
            },
            data: {
                title,
                content,
            },
        })
        return updatedReview
    }

    deleteReview = async (reviewId, password) => {
        const deletedReview = await dataSource.reviews.delete({
            where: {
                reviewId: +reviewId,
                password: password,
            },
        })
        return deletedReview
    }
}

const reviewRepository = new ReviewRepository()
module.exports = reviewRepository
