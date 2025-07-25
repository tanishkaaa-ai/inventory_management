const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();

router.get("/", function(req, res){
    res.send("working");
});

router.post("/register", registerStaff);

router.post("/login", loginStaff);

module.exports = router;