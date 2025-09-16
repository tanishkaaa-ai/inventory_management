const adminModel = require("../models/admin-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");
const Product = require('../models/product-model');
const productModel = require("../models/product-model");
const staffModel = require("../models/staff-model");

module.exports.registerAdmin = async function(req, res){
    try{
        let {email, password, name} = req.body;

        let admin = await adminModel.findOne({email: email});
        if(admin) return res.status(401).send("you already have an account, please log in");

        bcrypt.genSalt(10, function(err, salt) { 
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) return res.send(err.message);
                
                else{
                    let admin = await adminModel.create({
                        email,
                        password: hash,
                        name,
                    });
                    let token = generateToken(admin);
                    res.cookie('token', token, {
                        httpOnly: true,       // cannot be accessed by JS
                        secure: true,         // must be HTTPS
                        sameSite: 'none',     // allow cross-site cookie
                        maxAge: 24 * 60 * 60 * 1000 // optional: 1 day expiry
                      });
                    res.send("admin created successfully");
                }
                
            });
        });
    }
//hiii
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginAdmin = async function(req, res){
    let {email, password} = req.body;

    let admin = await adminModel.findOne({email: email});
    if(!admin) return res.send("Email or Password incorrect");

    bcrypt.compare(password, admin.password, function(err, result){
        if(result){
            let token = generateToken(admin);
            res.cookie('token', token, {
                httpOnly: true,       // cannot be accessed by JS
                secure: true,         // must be HTTPS
                sameSite: 'none',     // allow cross-site cookie
                maxAge: 24 * 60 * 60 * 1000 // optional: 1 day expiry
              });
            res.send("you can login");
        }
        else{
            res.send("Email or Password incorrect");
        }
    })
};

exports.getStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const staffCount = await staffModel.countDocuments();
     const lowStockCount = await productModel.countDocuments({
      $expr: { $lt: ["$stock", "$threshold"] }
    });

    res.json({ totalProducts, staffCount, lowStockCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};