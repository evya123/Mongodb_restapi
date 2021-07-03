// Authority Model
const Authority = require("./../models/Authority.js");
const NeedSpecifications = require("./../models/NeedSpecifications.js");
const apiResponse = require("./../helpers/apiResponse.js");
var logger = require("../helpers/logger");

// VALIDATION Import
const { authorityValidation } = require("./../validation.js");

/**
 * Add Authority.
 *
 * @param {string}      Authority
 * @param {string}      Contact
 * @param {string}      Population
 * @param {string}      Area
 * @param {string}      MedianAge
 *
 * @returns {Object}
 */
exports.addAuthority = [
  async (req, res) => {
    logger.winston.info("inside addAuthority");
    // Validate authority
    const { error } = authorityValidation(req.body);
    if (error) {
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );
    }
    // Check if Authority already in database
    const authorityExist = await Authority.findOne({
      Authority: req.body.Authority,
    });
    if (authorityExist) {
      logger.winston.info("Already exist");
      return apiResponse.ErrorResponse(res, "Authority already exists");
    }
    // Create authority
    const authority = new Authority({
      Authority: req.body.Authority,
      Contact: req.body.Contact,
      Population: req.body.Population,
      Area: req.body.Area,
      MedianAge: req.body.MedianAge,
    });
    // trying to save
    try {
      authority.save(async (err) => {
        if (err) {
          logger.winston.info("Error: " + err);
          return apiResponse.ErrorResponse(res, err);
        }
      });
      logger.winston.info("Saved authority!");
      return apiResponse.successResponseWithData(res, "Operation success", {
        authority_id: authority._id,
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
 * Get Authority by name.
 *
 * @param {string}      Authority
 *
 * @returns {Object}
 */
exports.getAuthority = [
  async (req, res) => {
    try {
      await Authority.findOne({ Authority: req.params.name }, (err, data) => {
        logger.winston.info("Getting Autority!");
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
 * Get All authorities.
 *
 * @returns {Object}
 */
exports.getAuthorities = [
  async (_, res) => {
    try {
      await Authority.find({}, (err, data) => {
        logger.winston.info("Getting Autorities!");
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
 * Delete Authority by name.
 *
 * @param {string} Authority
 *
 * @returns {Object}
 */
exports.deleteAuthority = [
  async (req, res) => {
    try {
      let doc = await Authority.findOne({
        Authority: req.params.name,
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
 * Update Authority.
 *
 * @param {string}      Contact
 * @param {string}      Population
 * @param {string}      Area
 * @param {string}      MedianAge
 *
 * @returns {Object}
 */
exports.updateAuthority = [
  async (req, res) => {
    logger.winston.info("Updating " + req.params.name + " fields");
    await Authority.findOneAndUpdate(
      {
        Authority: req.params.name,
      },
      {
        $set: {
          Contact: req.body.Contact,
          Population: req.body.Population,
          Area: req.body.Area,
          MedianAge: req.body.MedianAge,
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
 * Update ns.
 * @param {string}      Authority
 * @param {string}      Field
 * @param {string}      Needs
 * @param {string}      ExpectedResult
 * @param {string}      Budget
 *
 * @returns {Object}
 */
exports.updateNeedSpecification = [
  async (req, res) => {
    logger.winston.info("Updating " + req.params.name + " ns fields");
    const authority_id = await Authority.findOne(
      {
        Authority: req.params.name,
      },
      "_id"
    );
    NeedSpecifications.findOneAndUpdate(
      {
        AuthorityID: authority_id,
      },
      {
        $push: {
          Field: req.body.Field,
          Needs: req.body.Needs,
          ExpectedResult: req.body.ExpectedResult,
          Budget: req.body.Budget,
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
