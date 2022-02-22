// required imports
const express = require("express");
const bodyParser = require("body-parser");

// Executing express
const app = express();

// loading routes
const applicationRoutes = require("../controllers/application");
const providerRoutes = require("../controllers/provider");

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Prefix
app.use("/gapsi/v1" ,applicationRoutes);
app.use("/gapsi/v1" ,providerRoutes);

// exporting module
module.exports = app;