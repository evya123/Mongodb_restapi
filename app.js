const express = require("express");
const authorityRouter = require("./routes/authority");
const cors = require("cors");
const { MONGO_URI } = require('./config')
const mongoose = require("mongoose");

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to mongodb server");
})
	.catch(err => {
		console.error("Mongodb connection error:", err.message);
		process.exit(1);
	});
  
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))  ;

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/authority/", authorityRouter);
app.listen(3000, () => {
  console.log("Listening to port 3000");
});