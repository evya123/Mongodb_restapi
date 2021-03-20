const express = require("express");

// Authority Model
const Authority = require("../models/Authority");

// VALIDATION Import
const { authorityValidation } = require("../validation");

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
    // Validate User
    const { error } = authorityValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Authority already in database
    const authorityExist = await Authority.findOne({
      Authority: req.body.Authority,
    });
    if (authorityExist) return res.status(400).send("Authority already exists");

    // Validated And Create User
    const authority = new Authority({
      Authority: req.body.Authority,
      Contact: req.body.Contact,
      Population: req.body.Population,
      Area: req.body.Area,
      MedianAge: req.body.MedianAge,
    });

    try {
      await authority.save().then((err, doc) => {
        console.log("Saved authority");
      });
      res.json({
        authority: savedAuthority.Authority,
        Contact: savedAuthority.Contact,
      });
    } catch (err) {
      res.json({ message: err });
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
          return next("Error: " + err);
        } else {
          console.log("Value returned: " + data);
          if (data) res.json(data);
          else res.status(400).send("Could not find document!");
        }
      });
    } catch (err) {
      res
        .status(400)
        .send("Could not complete the request due to internal error!\n" + err);
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
          return next("Error: " + err);
        } else {
          console.log("Value returned: " + data);
          if (data) res.json(data);
          else res.status(400).send("Could not find document!");
        }
      });
    } catch (err) {
      res
        .status(400)
        .send("Could not complete the request due to internal error!\n" + err);
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
