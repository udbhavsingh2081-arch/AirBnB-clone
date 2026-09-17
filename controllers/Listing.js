const Listing=require("../models/listing");

module.exports.index=(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("index.ejs",{allListings});
});

module.exports.renderNewList=(async(req,res)=>{
    res.render("new");
});

module.exports.CreateNewList=(async (req,res,next)=>{
          let newList= new Listing(req.body.listing);     
          newList.owner=req.user._id;

        if (req.file) {
        newList.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

     if(req.coordinates){
        newList.geometry = req.coordinates;
    }
console.log(req.coordinates);
    await newList.save();
    req.flash("success","New Listing created!");
    res.redirect("/listings");
});

module.exports.renderEditList=(async (req,res)=>{
     let {id}=req.params;
     let list=await Listing.findById(id);
     if(!list){
        req.flash("error","listing not existed!")
        res.redirect("/listings")
     }
     if (list.image && list.image.url) {
     let originalImageUrl=list.image.url;}
    
     originalImageUrl=originalImageUrl.replace("/upload","/upload/w_200");
     list.image.url=originalImageUrl;
     res.render("edit",{list});
});

module.exports.editList=(async (req,res)=>{

   const {id}=req.params;

 let list= await Listing.findByIdAndUpdate(id,req.body.listing);
  if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;

      list.image={url,filename};
    await list.save();
  }

     req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
});

module.exports.Destroy=(async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndDelete(id);
     req.flash("success","Listing deleted!");
  res.redirect("/listings")
});

module.exports.showList=(async(req,res)=>{
    let {id}=req.params;
    let data= await Listing.findById(id)
    .populate(
        { path :"reviews",
        populate:{ path : "author"} })
        .populate("owner");

    console.log(data);
    if(!data){ 
        req.flash("error","Listing not exist!")
       return res.redirect("/listings");
    }
    res.render("show",{data});
});

module.exports.showByCategory= async(req,res)=>{
    let {category}=req.params;
    const list=await Listing.find({   category  });
 res.render("index.ejs",{ allListings: list});
}

module.exports.searchList=async(req,res)=>{
let {country, city, minPrice, maxPrice }=req.query;
    let filter={};

     if (country) {
        filter.country = country;
    }

    if (city) {
        filter.location = city;
    }

      if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

 const allListings = await Listing.find(filter);

res.render("index.ejs", {
    allListings
});
