const SolutionProvider = require("./../models/SolutionProvider.js");
const apiResponse = require("./../helpers/apiResponse.js");
const logger  = require('../helpers/logger');

// VALIDATION Import
const { solutionProviderValidation } = require("./../validation.js");


/**
 * Add Authority.
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
      ImplementationDescription: req.body.ImplementationDescription
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
