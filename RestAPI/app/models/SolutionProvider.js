const mongoose = require("mongoose");
const techSolution = require("./TechnologicalSolution");
var logger  = require('../helpers/logger');
const TechnologicalSolution = require("./TechnologicalSolution");

const SolutionProviderSchema = mongoose.Schema({
  Provider: {
    type: String,
    required: true,
  },
  Field: {
    type: String,
    required: true,
  },
  Solution: {
    type: String,
    required: true,
  },
  NeedTarget: {
    type: String,
    required: true,
  },
  Cost: {
    type: Number,
    required: true,
  },
  TechnicalDescription: {
    type: String,
    required: true,
  },
  ImplementationDescription: {
    type: String,
    required: true,
  },
});

SolutionProviderSchema.post("save", async function (doc, next) {
  logger.winston.info("Provider save post action");
  try {
    const ts = new techSolution({
      Solution: doc.Solution,
      SolutionProvider: doc._id,
    });
    logger.winston.info("Created ts, saving now.");
    ts.save(async (err) => {
      if (err) {
        logger.winston.info("ts save error", err);
        next(err);
      }
    });
    logger.winston.info("Saved default ts");
  } catch (err) {
    logger.winston.info("post save error", err);
    next(err);
  }
});

SolutionProviderSchema.pre("deleteOne",{ document: true, query: false }, async function (next) {
  logger.winston.info("Provider deleteone pre action");
  logger.winston.info("Trying to delete ts");
  try {
    await TechnologicalSolution.findOneAndDelete({ SolutionProvider: this._id });
  } catch (err) {
    logger.winston.info("pre deleteone error", err);
    next(err);
  }
  logger.winston.info("ts deleted");
});

module.exports = mongoose.model("SolutionProvider", SolutionProviderSchema);
