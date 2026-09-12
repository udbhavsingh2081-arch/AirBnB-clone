const Listing=require("../models/listing");
const Review=require("../models/review");

    module.exports.reviewAdd=(async(req,res)=>{
    let {id} =req.params;
    let list=await Listing.findById(id);
    let newreview=new Review(req.body.Review);
    newreview.author=req.user._id;
    list.reviews.push(newreview._id);
    await list.save();
   await newreview.save();
     req.flash("success","Review Added!");
    res.redirect(`/listings/${id}`);
});

module.exports.reviewDestroy=(async(req,res)=>{
let {id,reviewId}=req.params;
await Review.findByIdAndUpdate(id, {$pull :{ reviews : reviewId}});
await Review.findByIdAndDelete(reviewId);
 req.flash("success","Review Deleted!");
res.redirect(`/listings/${id}`);
});