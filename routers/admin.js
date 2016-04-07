var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    //console.log(router.mountpath);
    res.send('admin page');
});

module.exports = router;