const express = require("express");
const authorityRouter = require("./authority");
const solutionProviderRouter = require("./solutionProvider")

var app = express();

app.use("/authority", authorityRouter);
app.use("/provider", solutionProviderRouter)

module.exports = app;