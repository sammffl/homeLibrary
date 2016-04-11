var cheerio = require("cheerio");
var config = require("../../config")();
var utils = require("../../common/utils");


/**
 * 获取
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