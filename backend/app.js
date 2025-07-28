const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const config = require('config');
require("dotenv").config();
const mongoose = require("./config/mongoose-connect");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true
}));
app.use(express.json());
const indexRoutes = require("./routes/index");
const staffrouter = require("./routes/staffRouter");
const adminrouter = require("./routes/adminRouter");
const productrouter = require("./routes/productRouter");
const logrouter = require("./routes/logRouter");
const notirouter = require("./routes/notiRouter");
const statsRoute = require("./routes/stats-routes");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");

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
app.use("/product",productrouter);
app.use("/log",logrouter);
app.use("/notification",notirouter);
app.use("/admin/dashboard-stats", statsRoute);

app.listen(5000, () => {
    console.log("server running on port 5000");
});

