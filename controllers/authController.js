const staffModel = require("../models/staff-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

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
                    let token = generateToken(user);
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
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("you can login");
        }
        else{
            res.send("Email or Password incorrect");
        }
    })
};