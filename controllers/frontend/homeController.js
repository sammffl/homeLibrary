var utils = require("../../common/utils");
exports.index = function (req, res, next) {
    var ip = utils.getClientIp(req).split(":").pop();
    res.render("home", {title: "home", ip: ip});
};