const jwt = require("jsonwebtoken");
const staffModel = require("../models/staff-model");

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(res.cookies.token, process.env.JWT_KEY);
        let user = await staffModel
            .findOne({email: decoded.email})
            .select("-password"); //remove the password field
        req.user = user;
        next(); //send to next step
    }
    catch(err){
        req.flash("error", "something went wrong");
        res.redirect("/");
    }
};