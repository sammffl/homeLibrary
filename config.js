var fs = require("fs");
var config_default = {
    "httpPort": "8808",
    "httpsPort": "8809",
    "doubanBookSearchUrl": "https://book.douban.com/subject_search?search_text={()}&cat=1001",
    "doubanBookTagUrl": "https://book.douban.com/tag/?icn=index-nav",
    "default": "1"
};
module.exports = function () {
    var config = {};
    try {
        config = fs.readFileSync("config.json")
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