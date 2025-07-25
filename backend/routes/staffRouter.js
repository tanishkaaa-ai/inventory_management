const express = require('express');
const { registerStaff, loginStaff } = require('../controllers/authController');
const router = express.Router();

router.get("/", function(req, res){
    res.send("working");
});

router.post("/register", registerStaff);

router.post("/login", loginStaff);

module.exports = router;