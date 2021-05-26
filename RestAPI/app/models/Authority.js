const mongoose = require("mongoose");

const AuthoritySchema = mongoose.Schema({
  Authority: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  Contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Population: {
    type: Number,
    required: true,
  },
  Area: {
    type: Number,
    required: true,
  },
  MedianAge: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Authority", AuthoritySchema);
