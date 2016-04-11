var express = require("express");
var bookApi = require("./book");

var router = express.Router();
var config = require("../../config");

//book Tags标签
router.get('/books/tags', bookApi.tags);
router.get('/books/:bookname', bookApi.bookList);
module.exports = router;
