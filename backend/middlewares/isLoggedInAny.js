// middlewares/isLoggedinAny.js
const jwt = require("jsonwebtoken");
const staffModel = require("../models/staff-model");
const adminModel = require("../models/admin-model");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("You need to login first");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Try finding user in admin model first
    let user = await adminModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      // If not admin, check staff
      user = await staffModel.findOne({ email: decoded.email }).select("-password");
    }

    if (!user) return res.status(401).send("User not found");

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
};
