
    const mongoose = require("mongoose");
const Review=require("./review.js");
const schemalisting = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
    },
    category: {
        type: String,
          enum: [
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Mountains",
            "Villa",
            "Forest",
            "Surfing",
            "Apartments",
            "Farm House",
            "Cabins",
            "Lake",
            "Desert",
            "Island"
        ],
        default: "Trending"
    },
    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },
      geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0],
        },
    },
    reviews : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Review",
    }
    ],
    owner : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    
});
schemalisting.post("findByIdAndDelete",async (listing)=>{
    if(listing){
       await Review.deleteMany({ _id :{$in : listing.reviews}});
    }
});
const Listing = mongoose.model("Listing", schemalisting);
module.exports = Listing;