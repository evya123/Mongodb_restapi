const express = require("express");
const authorityRouter = require("./authority");
const userRouter = require("./user");

var app = express();

app.use("/authority", authorityRouter);
app.use("/user", userRouter);

module.exports = app;