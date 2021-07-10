const SolutionProvider = require("./../models/SolutionProvider");
const bestPractice = require("./../models/BestPractice");
const apiResponse = require("./../helpers/apiResponse");
const logger = require("../helpers/logger");

// VALIDATION Import
const { solutionProviderValidation } = require("./../validation.js");
const TechnologicalSolution = require("../models/TechnologicalSolution.js");

/**
 * Add Provider.
 *
 * @param {string}      Provider
 * @param {string}      Field
 * @param {string}      Solution
 * @param {string}      NeedTarget
 * @param {number}      Cost
 * @param {string}      TechnicalDescription
 * @param {string}      ImplementationDescription
 *
 * @returns {Object}
 */
exports.addSolutionProvider = [
  async (req, res) => {
    logger.winston.info("inside addSolutionProvider");
    // Validate provider
    const { error } = solutionProviderValidation(req.body);
    if (error) {
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );
    }
    // Check if provider is already in database
    const providerExist = await SolutionProvider.findOne({
      Provider: req.body.Provider,
    });
    if (providerExist) {
      logger.winston.info("Already exist");
      return apiResponse.ErrorResponse(res, "Solution provider already exists");
    }
    // Create authority
    const sp = new SolutionProvider({
      Provider: req.body.Provider,
      Field: req.body.Field,
      Solution: req.body.Solution,
      NeedTarget: req.body.NeedTarget,
      Cost: req.body.Cost,
      TechnicalDescription: req.body.TechnicalDescription,
      ImplementationDescription: req.body.ImplementationDescription,
    });
    // trying to save
    try {
      sp.save(async (err) => {
        if (err) {
          logger.winston.info("Error: " + err);
          return apiResponse.ErrorResponse(res, err);
        }
      });
      logger.winston.info("Saved provider!");
      return apiResponse.successResponseWithData(res, "Operation success", {
        provider_id: sp._id,
      });
    } catch (err) {
      logger.winston.info("Error " + err);
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    }
  },
];

/**
 * Get Provider by name.
 *
 * @param {string}      Provider
 *
 * @returns {Object}
 */
exports.getProvider = [
  async (req, res) => {
    try {
      await SolutionProvider.findOne(
        { Provider: req.params.name },
        (err, data) => {
          logger.winston.info("Getting Provider!");
          if (err) {
            logger.winston.info("Error: " + err);
            return apiResponse.ErrorResponse(res, "Error: " + err);
          } else {
            logger.winston.info("Value returned: " + data);
            if (data)
              return apiResponse.successResponseWithData(
                res,
                "Operation success",
                data
              );
            else
              return apiResponse.ErrorResponse(res, "Could not find document!");
          }
        }
      );
    } catch (err) {
      return apiResponse.ErrorResponse(
        res,
        "Could not complete the request due to internal error!\n" + err
      );
    }
  },
];

/**
 * Get All Providers.
 *
 * @returns {Object}
 */
exports.getProviders = [
  async (_, res) => {
    try {
      await SolutionProvider.find({}, (err, data) => {
        logger.winston.info("Getting Providers!");
        if (err) {
          logger.winston.info("Error: " + err);
          return apiResponse.ErrorResponse(res, "Error: " + err);
        } else {
          logger.winston.info("Value returned: " + data);
          if (data) {
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              data
            );
          } else {
            return apiResponse.ErrorResponse(res, "Could not find document!");
          }
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(
        res,
        "Could not complete the request due to internal error!\n" + err
      );
    }
  },
];

/**
 * Delete Provider by name.
 *
 * @param {string} Provider
 *
 * @returns {Object}
 */
exports.deleteProvider = [
  async (req, res) => {
    try {
      let doc = await SolutionProvider.findOne({
        Provider: req.params.name,
      });
      deleted = await doc.deleteOne();
      if (deleted) {
        return apiResponse.successResponse(res, "Operation success");
      } else {
        return apiResponse.ErrorResponse(res, "Nothing to delete!");
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Update Provider.
 *
 * @param {string}      Provider
 * @param {string}      Field
 * @param {string}      Solution
 * @param {string}      NeedTarget
 * @param {string}      Cost
 * @param {string}      TechnicalDescription
 * @param {string}      ImplementationDescription
 *
 * @returns {Object}
 */
exports.updateProvider = [
  async (req, res) => {
    logger.winston.info("Updating " + req.params.name + " fields");
    await SolutionProvider.findOneAndUpdate(
      {
        Provider: req.params.name,
      },
      {
        $set: {
          Provider: req.body.Provider,
          Field: req.body.Field,
          Solution: req.body.Solution,
          NeedTarget: req.body.NeedTarget,
          Cost: req.body.Cost,
          TechnicalDescription: req.body.TechnicalDescription,
          ImplementationDescription: req.body.ImplementationDescription,
        },
      },
      // new: true return the object after the change
      { new: true },
      (err, data) => {
        if (!err) {
          logger.winston.info("Update document succeeded");
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            data
          );
        } else {
          logger.winston.info("Failed saving document due to " + err);
          return apiResponse.ErrorResponse(res, err);
        }
      }
    );
  },
];

/**
 * Update Provider.
 *
 * @param {string}      Solution
 * @param {string}      SolutionProvider
 * @param {string}      ImplementationSystem
 * @param {string}      Budget
 * @param {string}      Effect
 * @param {string}      Constrains
 * @param {string}      NeededWrapper
 *
 * @returns {Object}
 */
exports.updateTechSolution = [
  async (req, res) => {
    logger.winston.info("Updating " + req.params.name + " ts fields");
    const provider_id = await SolutionProvider.findOne(
      {
        Provider: req.params.name,
      },
      "_id"
    );
    logger.winston.info("provider found: "+provider_id)
    TechnologicalSolution.findOneAndUpdate(
      {
        SolutionProvider: provider_id,
      },
      {
        $set: {
          ImplementationSystem: req.body.ImplementationSystem,
          Budget: req.body.Budget,
          Effect: req.body.Effect,
          Constrains: req.body.Constrains,
          NeededWrapper: req.body.NeededWrapper,
        },
      },
      { new: true },
      (err, data) => {
        if (!err) {
          logger.winston.info("Update document succeeded");
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            data
          );
        } else {
          logger.winston.info("Failed saving document due to " + err);
          return apiResponse.ErrorResponse(
            res,
            "Failed saving document due to " + err
          );
        }
      }
    );
  },
];

/**
 * Add Best Practice.
 *
 * @param {string}      Solution
 * @param {string}      Authority
 * @param {string}      Result
 * @param {string}      Problems
 * @param {number}      Method
 * @param {string}      Suitability
 * @param {string}      Provider
 *
 * @returns {Object}
 */
exports.addBestPractice = [
  async (req, res) => {
    logger.winston.info("inside addBestPractice");
    // Create bp
    const bp = new bestPractice({
      Solution: req.body.Solution,
      Authority: req.body.Authority,
      Result: req.body.Result,
      Problems: req.body.Problems,
      Method: req.body.Method,
      Suitability: req.body.Suitability,
      Provider: req.body.Provider,
    });
    // trying to save
    try {
      bp.save(async (err) => {
        if (err) {
          logger.winston.info("Error: " + err);
          return apiResponse.ErrorResponse(res, err);
        }
      });
      logger.winston.info("Saved best practice!");
      return apiResponse.successResponseWithData(res, "Operation success", {
        bestpractice_id: bp._id,
      });
    } catch (err) {
      logger.winston.info("Error " + err);
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    }
  },
];
