const User= require("../models/user.js");

module.exports.signUpForm=(req,res)=>{ 
     res.render("user/signUp.ejs");
};

module.exports.signUp=(async(req,res)=>{
     try{
     let {username ,email ,password}=req.body;
     let newUser=new User ({email , username});
   let signedUser=  await User.register(newUser,password);
          req.login(signedUser,(err)=>{
               if(err){ return next(err);}
                 req.flash("success","Wellcome to WanderLust");
     res.redirect("/listings");})  
} catch(er){
          req.flash("error","User already existed with same details!");
          res.redirect("/signUp");
     }
});

module.exports.loginForm=(req,res)=>{
     res.render("user/login.ejs");
};

module.exports.login=async(req,res)=>{
              let redirectUrl =
            req.session.redirectUrl || "/listings";

        delete req.session.redirectUrl;

          req.flash("success","Wellcome back to WanderLust");
  res.redirect(redirectUrl);

};

module.exports.logOut=(req,res)=>{
     req.logOut((err)=>{
          if(err){
               return next(err);
          }
          req.flash("success","logged out!");
          res.redirect("/listings");
     });
};