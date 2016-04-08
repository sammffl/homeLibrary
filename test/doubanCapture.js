var https = require("https");
var http = require("http");
var cheerio = require("cheerio");
var async = require("async");
var utils = require("../common/utils");
var config = require("../config.json");


var testFunc = utils.getDataByHttps;
console.log(typeof testFunc);
var url2 = config.doubanBookTagUrl;
url2 = encodeURI(url2);

var url = config.doubanBookSearchUrl;
url = url.replace("{()}", "龙族");
url = encodeURI(url);
console.log(url);
var searchDoubanBookTitle = utils.getDataByHttps;

searchDoubanBookTitle(url, function (data) {
    if (data) {
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        var $list = $("#content .subject-list .subject-item");
        var list = [];
        $list.each(function (index) {
            var $li = $(this);
            var img = {
                imgUrl: $li.find(".pic img").attr("src"),
                detailUrl: $li.find(".pic .nbg").attr("href")
            };
            img.imgUrl = img.imgUrl.replace("mpic", "lpic");
            var info = $li.find(".info");
            var bookInfo = {
                title: $li.find(".info > h2 > a").attr("title"),
                pub: $li.find(".info > .pub").text().trim(),
                star: $li.find(".info > .star > .rating_nums").text().trim(),
                price: $li.find(".info > .ft > .cart-actions >.buy-info > a").text().trim()
            };
            var li = {
                img: img,
                bookInfo: bookInfo
            };
            list.push(li);

        });

        console.log(list)
    } else {
        console.log("err");
    }
});

var searchDoubanBookTag = utils.getDataByHttps;
var url2 = config.doubanBookTagUrl;
url2 = encodeURI(url2);
console.log(url2);
searchDoubanBookTag(url2, function (data) {
    if (data) {
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        var $tagClass = $("#wrapper .article >div:nth-child(2) >div");
        var list = [];
        $tagClass.each(function (i) {
            var tagClass = {
                title: $(this).find("a").attr("name"),
                tags: []
            };
            var tags = [];
            $(this).find(".tagCol td > .tag").each(function (i) {
                tags.push($(this).text().trim());
            });
            tagClass.tags = tags;
            list.push(tagClass);
        });
        console.log(list);
    } else {
        console.log("error");
    }
});

