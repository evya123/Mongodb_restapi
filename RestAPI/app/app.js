var express = require("express");
var cors = require("cors");
var { MONGO_URI } = require("./config");
var mongoose = require("mongoose");
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index")
var apiResponse = require("./helpers/apiResponse");
var logger = require('./helpers/logger');

mongoose.connect(MONGO_URI, {
    auth: { authSource : "admin" },
    user: process.env.MONGO_USERNAME ,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose.connection.on("connected", function () {
  logger.winston.info("Mongoose connected to db");
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  logger.winston.info("Mongoose connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  logger.winston.info("Mongoose connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    logger.winston.info("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

var app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/",indexRouter);
app.use("/api", apiRouter);


// throw 404 if URL not found
app.all("*", function (_, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

module.exports = app;
