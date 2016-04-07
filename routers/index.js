var express = require("express");
var router = express.Router();
router.all("/", function (req, res, next) {
    console.log("start");
    next();
});
router.get("/", function (req, res, next) {
    res.render("index");
    next();
}).post("/", function (req, res, next) {
    console.log("post");
    res.send("ok");
    next();
});

router.all("/", function (req, res) {
    console.log("end")
});

module.exports = router;