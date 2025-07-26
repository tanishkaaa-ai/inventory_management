const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin-model");

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        return res.status(401).send("You need to login first");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await adminModel
            .findOne({email: decoded.email})
            .select("-password"); //remove the password field
             if (!user) {
            return res.status(403).send("Forbidden: Admins only");
        }
        req.user = user;
        next(); //send to next step
    }
    catch(err){
        return res.status(401).send("Invalid or expired token");
    }
};