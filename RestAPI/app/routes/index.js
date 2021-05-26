var express = require("express");
var router = express.Router();
var apiResponse = require("./../helpers/apiResponse");

/* GET home page. */
router.get("/", (_, res) => {
  return apiResponse.successResponse(
    res,
    "Operation success"
  );
  });

module.exports = router;
