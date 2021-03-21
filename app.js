import express, { json, urlencoded } from "express";
import cors from "cors";
import { MONGO_URI } from "./config";
import { connect, connection } from "mongoose";
import logger from "morgan";
import apiRouter from "./routes/api";
import { notFoundResponse } from "./helpers/apiResponse";

//
connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.on("connected", function () {
  console.log("Mongoose connected to db");
});

// If the connection throws an error
connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

// When the connection is disconnected
connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  connection.close(function () {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

var app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(logger("dev"));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/api/", apiRouter);

app.get("/", async (_, res) => {
  console.log("In /");
  res.json({ msg: "App is working!" });
});

// throw 404 if URL not found
app.all("*", function (_, res) {
  return notFoundResponse(res, "Page not found");
});

export default app;
