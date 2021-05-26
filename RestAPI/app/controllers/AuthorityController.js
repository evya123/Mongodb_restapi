// Authority Model
const Authority = require("./../models/Authority.js");
const apiResponse = require("./../helpers/apiResponse.js");

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
    // Validate authority
    const { error } = authorityValidation(req.body);
    if (error)
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );

    // Check if Authority already in database
    const authorityExist = await Authority.findOne({
      Authority: req.body.Authority,
    });
    if (authorityExist) {
      console.log("Already exist");
      return apiResponse.ErrorResponse(res, "Authority already exists");
    }

    // Validated And Create authority
    const authority = new Authority({
      Authority: req.body.Authority,
      Contact: req.body.Contact,
      Population: req.body.Population,
      Area: req.body.Area,
      MedianAge: req.body.MedianAge,
    });

    try {
      authority.save(async (err) => {
        if (err) {
          console.log("Error: " + err);
          return apiResponse.ErrorResponse(res, err);
        }
        console.log("Saved authority");
        let authorityData = {
          _id: authority._id,
          Authority: authority.Authority,
        };
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          authorityData
        );
      });
    } catch (err) {
      console.log("Error " + err);
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
        console.log("Getting Autority!");
        if (err) {
          console.log("Error: " + err);
          return apiResponse.ErrorResponse(res, "Error: " + err);
        } else {
          console.log("Value returned: " + data);
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
        console.log("Getting Autorities!");
        if (err) {
          console.log("Error: " + err);
          return apiResponse.ErrorResponse(res, "Error: " + err);
        } else {
          console.log("Value returned: " + data);
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
 * @param {string}      Authority
 *
 */
exports.deleteAuthority = [
  async (req, res) => {
    try {
      const removedAuthority = await User.deleteOne({
        Authority: req.params.name,
      });
      res.json(removedAuthority);
    } catch (err) {
      res.json({ message: err });
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
    console.log("Updating " + req.params.name + " fields");
    await Authority.findOneAndUpdate(
      {
        //need to change since it's directed function and without middleware
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
      { new: true },
      (err, data) => {
        if (!err) {
          console.log("Update document succeeded");
          res.json(data);
        } else {
          console.log("Failed saving document due to " + err);
          res.status(400).json(err);
        }
      }
    );
  },
];
