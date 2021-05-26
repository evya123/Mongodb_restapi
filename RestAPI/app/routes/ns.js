var express = require("express");
var router = express.Router();
const NeedSpecificationsController = require("../controllers/NeedSpecificationsController");

// @routes POST api/ns
// @desc Add NeedSpecifications
router.post("/addns", NeedSpecificationsController.addNeedSpecifications);


module.exports = router;