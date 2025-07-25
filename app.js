const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const indexRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
require("dotenv").config();
app.use(
    expressSession({
        resave:false, // 
        saveUninitialized : false, 
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.use("/", indexRoutes);

app.listen(3000, () => {
    console.log("server running on port 3000");
});