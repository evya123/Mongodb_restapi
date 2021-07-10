var express = require("express");
var router = express.Router();
const solutionProviderController = require("../controllers/SolutionProviderController");
const SolutionProvider = require("../models/SolutionProvider");

// @routes POST api/authorities
// @desc Add Authority
router.post("/addProvider", solutionProviderController.addSolutionProvider);

// @routes GET api/authorities
// @desc Get Authority by name
router.get("/:name", solutionProviderController.getProvider);

// Get all providers
router.get("/", solutionProviderController.getProviders);

// Delete authority
router.delete("/:name", solutionProviderController.deleteProvider);

// @routes PATCH api/provider
// @desc Update provider
router.patch("/:name", solutionProviderController.updateProvider);

module.exports = router;