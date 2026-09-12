const express=require("express");
const router=express.Router({mergeParams : true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utilis/wrapAsync.js");
const {reviewSchema}=require("../schema.js")
const expressError=require("../utilis/expressError.js");
const {isloggedIn,isReviewAuthor}=require("./middleware.js");
const reviewController=require("../controllers/reviews.js")
const validateReview=(req,res,next)=>{
let {error}=reviewSchema.validate(req.body);
if(error){
    let errmesg=error.details.map((el)=>el.message).join(",");
     return next(new expressError(400, errmesg));
}
    next();
}

router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.reviewAdd));

router.delete("/:reviewId",isloggedIn,isReviewAuthor,
wrapAsync(reviewController.reviewDestroy));

module.exports=router;