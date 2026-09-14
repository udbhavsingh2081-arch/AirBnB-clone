if(process.env.NODE_ENV !="production"){

    require("dotenv").config()}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utilis/wrapAsync.js");
const expressError=require("./utilis/expressError.js");
const multer  = require('multer');
const { storage } = require("./cloudconfig.js");
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const listings=require("./routes/Listing.js")
const reviews=require("./routes/review.js")
const userRoute=require("./routes/User.js")
const session=require("express-session");
const flash=require("connect-flash");
const User=require("./models/user.js");
const LocalStrategy=require("passport-local");
const passport = require("passport");

app.use(session({
   secret : process.env.SECRET,
    resave : false,
    saveUninitialized: true,
    cookie :{
        maxAge :7*24*60*60*1000,
        httpOnly:true,

    },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy(User.authenticate())
);

passport.serializeUser(
 User.serializeUser()
);

passport.deserializeUser(
 User.deserializeUser()
);


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
      res.locals.currUser=req.user;
    next();
});
let MongoUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connected with DB");
}).catch((er)=>{
    console.log(er);
})

async function main() {
  await  mongoose.connect(MongoUrl);
}

app.get("/", (req, res) => {
    res.redirect("/listings");
});



app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",userRoute);

app.use((req,res,next)=>{
    next(new expressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{  
       console.log("ERROR:", err);
       let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { err });
});


app.listen(8080,()=>{
    console.log("server start");
});