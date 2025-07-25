const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const indexRoutes = require("./routes/index");
const staffrouter = require("./routes/staffRouter");
const adminrouter = require("./routes/adminRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
require("dotenv").config();
app.use(
    expressSession({
        resave:false, // 
        saveUninitialized : true, 
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.use("/", indexRoutes);
app.use("/staff",staffrouter);
app.use("/admin",adminrouter);

app.listen(5000, () => {
    console.log("server running on port 5000");
});