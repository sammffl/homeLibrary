var express = require("express");
var home = require("./frontend/homeController");
var router = express.Router();

//home page
router.get("/", home.indexGetHeadersMessage, home.index);


module.exports = router;