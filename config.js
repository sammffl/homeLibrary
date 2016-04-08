var fs = require("fs");
var config_default = {
    "httpPort": "8801",
    "httpsPort": "8802",
    "mongoDB":"mongodb://27.115.58.228/xinyongjin",
    "doubanBookSearchUrl": "https://book.douban.com/subject_search?search_text={()}&cat=1001",
    "doubanBookTagUrl": "https://book.douban.com/tag/?icn=index-nav",
    "default": "1"
};
module.exports = function () {
    var config = {};
    try {
        config = fs.readFileSync("./config.json")
    } catch (e) {
        console.log(e);
    }

    for (var prop in config_default) {
        if (!config.hasOwnProperty(prop)) {
            config[prop] = config_default[prop];
        }
    }
    return config;
};