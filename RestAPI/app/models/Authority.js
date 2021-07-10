const mongoose = require("mongoose");
const NeedSpecifications = require("./NeedSpecifications");
var logger  = require('../helpers/logger');

const ContactSchema = mongoose.Schema({
  _id: false,
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const AuthoritySchema = mongoose.Schema({
  Authority: {
    type: String,
    required: true,
    unique: true,
  },
  Contact: ContactSchema,
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

AuthoritySchema.post("save", async function (doc, next) {
  logger.winston.info("Authority save post action");
  try {
    const ns = new NeedSpecifications({
      AuthorityID: doc._id,
    });
    logger.winston.info("Created ns, saving now.");
    ns.save(async (err) => {
      if (err) {
        logger.winston.info("ns save error", err);
        next(err);
      }
    });
    logger.winston.info("Saved default ns");
  } catch (err) {
    logger.winston.info("post save error", err);
    next(err);
  }
});

AuthoritySchema.pre("deleteOne",{ document: true, query: false }, async function (next) {
  logger.winston.info("Authority deleteone pre action");
  logger.winston.info("Trying to delete ns");
  try {
    await NeedSpecifications.findOneAndDelete({ AuthorityID: this._id });
  } catch (err) {
    logger.winston.info("pre deleteone error", err);
    next(err);
  }
  logger.winston.info("ns deleted");
});

module.exports = mongoose.model("Authority", AuthoritySchema);
