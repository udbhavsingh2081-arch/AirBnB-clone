const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {listingSchema}=require("../schema.js")
const expressError=require("../utilis/expressError.js");

module.exports.isloggedIn=(req,res,next)=>{

if(!req.isAuthenticated()){ 
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","Please login first!")
     return res.redirect("/login");}

next();
}

module.exports.isowner=async(req,res,next)=>{
     const {id}=req.params;
    
       let listing=await Listing.findById(id);

     if(!listing.owner._id.equals(req.user._id)){

    req.flash("error","you don't have permission to edit!");
   return  res.redirect(`/listings/${id}`);
   }
   next();
}
module.exports.isReviewAuthor=async(req,res,next)=>{
     const {id,reviewId}=req.params;
    
       let review=await Review.findById(reviewId);

     if(!review.author._id.equals(req.user._id)){

    req.flash("error","you don't have permission to delete!");
   return  res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.validateListing=(req,res,next)=>{
    console.log(req.body);
let {error}=listingSchema.validate(req.body);
if(error){
    let errmesg=error.details.map((el)=>el.message).join(",");
    throw new expressError(400,errmesg);
}else {
    next();
}
}
module.exports.geocodeLocation = async (req, res, next) => {
    try {
        console.log("BODY =", req.body);
        let location = req.body.listing.location;
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
            {
                headers: {
                    "User-Agent": "WanderlustApp/1.0"
                }
            }
        );
        const place = await response.json();
        console.log("PLACE =", place);
        if (place.length > 0) {
            req.coordinates = {
                type: "Point",
                coordinates: [
                    Number(place[0].lon),
                    Number(place[0].lat)
                ]
            };
        }
        console.log("COORDINATES =", req.coordinates);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};