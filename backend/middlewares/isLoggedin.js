const jwt = require("jsonwebtoken");
const staffModel = require("../models/staff-model");

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        return res.status(401).send("You need to login first");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await staffModel
            .findOne({email: decoded.email})
            .select("-password"); //remove the password field
        req.user = user;
        next(); //send to next step
    }
    catch(err){
         return res.status(401).send("Invalid or expired token");
    }
};