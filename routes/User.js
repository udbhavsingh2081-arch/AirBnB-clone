const express=require("express");
const router=express.Router({mergeParams : true});

const passport = require("passport");
const wrapAsync = require("../utilis/wrapAsync");
const userControllers=require("../controllers/user.js");

//SignUp
router
.route("/signUp")
.get(userControllers.signUpForm)
.post(wrapAsync(userControllers.signUp));


//Login
router
.route("/login")
.get(userControllers.loginForm)
.post(
     passport.authenticate("local",{failureRedirect: "/login",
          failureFlash : true,
     }),wrapAsync(userControllers.login));
     

//logout
router.get("/logout",(userControllers.logOut));

module.exports=router;