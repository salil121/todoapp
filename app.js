// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routes = require("./Routes/appRoute");
const app = express();

// Setting view engine
// This will tell node js about template engine which i am using .
app.set("view engine","ejs");

// Setting static folder
app.use(express.static("public"));

// Connecting with database
const PORT = process.env.PORT; // Importing port number from .env file .
const MONGODB_URI = process.env.MONGODB_URI; // Importing database connection URL from .env file .
mongoose.connect(MONGODB_URI).then(() => {

    // After making connection from database our app start listening for requests from user side .
    app.listen(PORT,() => {
        console.log(`Listening for requests on port ${PORT} .`);
    });

}).catch((err) => {
    console.log(err);
});

// Using middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// All routes with in this web app .
app.use(routes);

// 404 Error Handler
// If the request not matches with any of the route then this route will be called and eventually it will 
// give 404 page not found error .
app.use((req,res,next) => {
    res.status(404).render("404");
});