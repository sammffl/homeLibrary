var express = require("express");
var home = require("./frontend/homeController");
var ajaxPage = require("./frontend/ajaxDemoController");
var router = express.Router();

//home page
router.get("/", home.indexGetHeadersMessage, home.index);
router.get("/home", home.indexGetHeadersMessage, home.index);
router.post("/sign", home.signUser);
router.post("/unsign", home.unsignUser);

router.get("/ajaxDemo",ajaxPage.ajaxPage);
module.exports = router;