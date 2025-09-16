const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose
    .connect(`mongodb+srv://metanisha333:dFlRrWnUd02MoXdZ@cluster0.2bkwjmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/inventory`)
    
    .then(function(){
        dbgr("connected");
    })
    .catch(function(err){
        dbgr(err);
    });


module.exports = mongoose.connection;