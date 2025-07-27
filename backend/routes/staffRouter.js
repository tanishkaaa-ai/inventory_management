const express = require('express');
const { registerStaff, loginStaff ,getStats} = require('../controllers/authController');
const router = express.Router();

router.get("/", function(req, res){
    res.send("working");
});

router.get('/stats', getStats);
router.post("/register", registerStaff);

router.post("/login", loginStaff);

module.exports = router;