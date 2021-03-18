var express = require("express");
require("dotenv").config();

var authorityRouter = require("./routes/authority");
var cors = require("cors");

// DB connection
var MONGODB_URL = process.env.DB_CONNECTION;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to %s", MONGODB_URL);
  console.log("App is running ... \n");
  console.log("Press CTRL + C to stop the process. \n");
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
  
  var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))  ;

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/authority/", authorityRouter);
app.listen(3000, () => {
  console.log("Listening to port 3000");
});