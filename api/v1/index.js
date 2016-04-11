var express = require("express");
var bookApi = require("./book");

var router = express.Router();
var config = require("../../config");

//book Tags标签
router.get('/tags', bookApi.tags);

module.exports = router;
