const express = require("express");
const authorityRouter = require("./routes/authority");
const cors = require("cors");
const { MONGO_URI } = require('./config');
const mongoose = require("mongoose");
const router = require("./routes/authority");

mongoose.connect(MONGO_URI, 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
  		console.log("Connected to mongodb server");
	})
	.catch(err => {
		console.error("Mongodb connection error:", err.message);
		process.exit(1);
	});
  
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use('/api/authorities', authorityRouter);

app.get('/',async(_, res) => {
	console.log('In /')
	res.json({msg: "App is working!"})
})

app.listen(3000, () => {
  console.log("Listening to port 3000");
});