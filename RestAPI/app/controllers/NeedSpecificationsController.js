// Authority Model
const ns = require("../models/NeedSpecifications.js");
const apiResponse = require("../helpers/apiResponse.js");

// VALIDATION Import
const { needSpecificationsValidation } = require("../validation.js");

/**
 * Update ns.
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
