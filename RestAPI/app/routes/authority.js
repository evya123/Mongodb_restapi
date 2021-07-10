var express = require("express");
var router = express.Router();
const authorityController = require("../controllers/AuthorityController");

// @routes POST api/authorities
// @desc Add Authority
router.post("/addAuthority", authorityController.addAuthority);

// @routes GET api/authorities
// @desc Get Authority by name
router.get("/:name", authorityController.getAuthority);

// Get all authorities
router.get("/", authorityController.getAuthorities);

// Delete authority
router.delete("/:name", authorityController.deleteAuthority);

// @routes PATCH api/authority
// @desc Upate Authority
router.patch("/:name", authorityController.updateAuthority);

router.patch("/:name/ns", authorityController.updateNeedSpecification)

module.exports = router;