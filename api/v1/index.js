var express = require("express");
var bookApi = require("./book");
var filmApi = require("./film");
var ajaxDemo = require("./ajaxDemo");

var router = express.Router();
var config = require("../../config")();

//所有接口介绍
router.get("/", function (req, res, next) {
    var host = req.rawHeaders[1];
    res.send({
        "books_tags_from_douban": host + "/api/v1/books/tags",
        "books_name_list_from_douban": host + "/api/v1/books/:bookname",
    })
});
//book Tags标签
router.get('/books/tags', bookApi.tags);
router.get('/books/:bookname', bookApi.bookList);
module.exports = router;


//film
router.get('/films/tags', filmApi.filmList);

//ajaxDemo
router.get("/getText", ajaxDemo.getText);
