const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/authControlleradmin');
const router = express.Router();

router.get("/", function(req, res){
    res.send("working");
});

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

module.exports = router;