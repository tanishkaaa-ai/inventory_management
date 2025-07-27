const staffModel = require("../models/staff-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");
const productModel = require("../models/product-model");
module.exports.registerStaff = async function(req, res){
    try{
        let {email, password, name} = req.body;

        let staff = await staffModel.findOne({email: email});
        if(staff) return res.status(401).send("you already have an account, please log in");

        bcrypt.genSalt(10, function(err, salt) { 
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) return res.send(err.message);
                
                else{
                    let staff = await staffModel.create({
                        email,
                        password: hash,
                        name,
                    });
                    let token = generateToken(staff);
                    res.cookie("token", token);
                    res.send("user created successfully");
                }
                
            });
        });
    }

    catch(err){
        res.send(err.message);
    }
};

module.exports.loginStaff = async function(req, res){
    let {email, password} = req.body;

    let staff = await staffModel.findOne({email: email});
    if(!staff) return res.send("Email or Password incorrect");

    bcrypt.compare(password, staff.password, function(err, result){
        if(result){
            let token = generateToken(staff);
            res.cookie("token", token);
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
     const lowStockCount = await productModel.countDocuments({
      $expr: { $lt: ["$stock", "$threshold"] }
    });
     const noStockCount = await productModel.countDocuments({
      stock: 0
    });

    res.json({ totalProducts,noStockCount, lowStockCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};