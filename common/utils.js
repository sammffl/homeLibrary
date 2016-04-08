var https = require("https");
var http = require("http");
var cheerio = require("cheerio");

module.exports.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

module.exports.getDataByHttps = function (url, callback) {
    https.get(url, function (res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
        res.on("error", function () {
            callback(null);
        });
    });
};

module.exports.getDataByHttp = function (url, callback) {
    http.get(url, function (res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
        res.on("error", function () {
            callback(null);
        });
    });
};