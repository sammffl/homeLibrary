var cheerio = require("cheerio");
var config = require("../../config")();
var utils = require("../../common/utils");


/**
 * 获取豆瓣图书分类
 * @param req
 * @param res
 * @param next
 */
exports.tags = function (req, res, next) {
    var url = encodeURI(config.doubanBookTagUrl);
    console.log(url);
    utils.getDataByHttps(url, function (data) {
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
            //console.log(list);
            res.send(JSON.stringify(list));
        } else {
            console.log("error");
        }
    })
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.bookList = function(req,res,next){
    var url = config.doubanBookSearchUrl;
    url = url.replace("{()}", req.params.bookname);
    url = encodeURI(url);
    console.log(url);

    utils.getDataByHttps(url, function (data) {
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
            res.send(list);
            console.log(list)
        } else {
            console.log("err");
        }
    })
};