const express=require("express");
const router=express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const expressError=require("../utilis/expressError.js");

const Listing=require("../models/listing.js");
const {isloggedIn,isowner,validateListing,geocodeLocation}=require("./middleware.js");
const listingControllers=require("../controllers/Listing.js")
const multer = require("multer");
const { storage } = require("../cloudconfig.js");

const upload = multer({ storage });

//Index routes

router.get("/",wrapAsync(listingControllers.index));

//new List
router.get("/new",isloggedIn,wrapAsync(listingControllers.rednerNewList));

//router.post("/",validateListing,wrapAsync(listingControllers.CreateNewList));
router.post(
    "/",isloggedIn,
   upload.array("listing[images]", 10),
    validateListing,
    geocodeLocation,
    wrapAsync(listingControllers.CreateNewList)
);


//searchBar
router.get("/search",wrapAsync(listingControllers.searchList));

//Edit
router.get("/:id/edit",isloggedIn,isowner,wrapAsync(listingControllers.renderEditList));


router.put("/:id",isloggedIn,isowner, upload.single("listing[image]"),validateListing,geocodeLocation,wrapAsync(listingControllers.editList));

//Delete
router.delete("/:id",isloggedIn,isowner,wrapAsync(listingControllers.Destroy));

//show
router.get("/:id",isloggedIn,wrapAsync(listingControllers.showList));

//Show By Category
router.get("/category/:category",wrapAsync(listingControllers.showByCategory));

module.exports=router;