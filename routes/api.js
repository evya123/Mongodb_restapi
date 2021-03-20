var express = require("express");
var authorityRouter = require("./authority");

var app = express();

app.use("/authority/", authorityRouter);

module.exports = app;
