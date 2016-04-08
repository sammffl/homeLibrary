var express = require("express");
var router = express.Router();

var utils = require("../common/utils");

router.all("/", function (req, res, next) {

    console.log(utils.getClientIp(req));

    //console.log("start");
    next();
});
router.get("/", function (req, res, next) {
    res.render("index");
    //console.log("get");
    next();
}).post("/", function (req, res, next) {
    //console.log("post");
    res.send("post");
    next();
});

router.all("/", function (req, res) {
    //console.log("end")
});

module.exports = router;