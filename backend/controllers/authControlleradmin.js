const adminModel = require("../models/admin-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

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
                    res.cookie("token", token);
                    res.send("admin created successfully");
                }
                
            });
        });
    }

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
            res.cookie("token", token);
            res.send("you can login");
        }
        else{
            res.send("Email or Password incorrect");
        }
    })
};