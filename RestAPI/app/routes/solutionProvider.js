var express = require("express");
var router = express.Router();
const solutionProviderController = require("../controllers/SolutionProviderController");

// @routes POST api/authorities
// @desc Add Authority
router.post("/addProvider", solutionProviderController.addSolutionProvider);

// Get all authorities
router.get("/all", solutionProviderController.getProviders);

module.exports = router;