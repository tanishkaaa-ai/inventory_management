const express = require('express');
const router = express.Router();

router.get("/", function(req, res){
    console.log("working");
});

module.exports = router;