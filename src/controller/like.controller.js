const likeService = require('../service/like.service')

class LikeController {
    createLike = async(req,res,next) => {
        try{
            const {id} = req.user;
            

        }catch(err){
            next(err);
        }
    }

}

const likeController = new LikeController
module.exports = likeController