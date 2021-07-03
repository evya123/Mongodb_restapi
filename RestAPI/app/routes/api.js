const express = require("express");
const authorityRouter = require("./authority");
const solutionProviderRouter = require("./solutionProvider")
const userRouter = require("./user");

var app = express();

app.use("/authority", authorityRouter);
app.use("/provider", solutionProviderRouter)
app.use("/user", userRouter);

module.exports = app;