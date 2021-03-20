const express = require("express");
const authorityRouter = require("./routes/authority");
const cors = require("cors");
const { MONGO_URI } = require('./config');
const mongoose = require("mongoose");
const router = require("./routes/authority");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const apiResponse = require("./helpers/apiResponse");

//
mongoose.connect(MONGO_URI, { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to db');
}); 
  
// If the connection throws an error
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use('/',indexRouter);
app.use('/api/authorities', authorityRouter);

app.get('/',async(_, res) => {
	console.log('In /')
	res.json({msg: "App is working!"})
})

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});