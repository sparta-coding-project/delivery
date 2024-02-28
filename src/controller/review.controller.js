class ReviewController {
    constructor(reviewService){
        this.reviewService = reviewService
    }
    createReview = async (req, res, next) => {
        try {
            const { userId, title, content} = req.body

            const createdReview = await this.reviewService.createReview(
                userId,
                title,
                content,
                
                
            ) // 받아오는 값 나중에 다시 확인;;

            return res.status(201).json({ data: createdReview })
        } catch (err) {
            next(err)
        }
    }

    getReview = async (req, res, next) => {
        try {
            const reviews = await this.reviewService.findAllReviews()
            return res.status(200).json({ data: reviews })
        } catch (err) {
            next(err)
        }
    }

    getReviewById = async (req, res, next) => {
        try {
            const { reviewId } = req.params
            const review = await this.reviewService.findReviewById(reviewId)

            return res.status(200).json({ data: review })
        } catch (err) {
            next(err)
        }
    }

    updateReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params
            const { password, title, content } = req.body

            const updatedReview = await this.reviewService.updateReview(
                reviewId,
                password,
                title,
                content,

            )
            return res.status(200).json({data : updatedReview})
        } catch (err) {
            next(err)
        }
    }

    deleteReview = async (req, res, next) => {
        try{
            const{reviewId} = req.params
            const { password } = req.body;

            const deletedReview = await this.reviewService.deleteReview(reviewId, password)

            return res.status(200).json({data: deleteReview})
        }catch(err){
            next(err)
        }
    }
}


module.exports = ReviewController
