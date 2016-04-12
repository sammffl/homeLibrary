var utils = require("../../common/utils");
exports.index = function (req, res, next) {
    var body = "";
    if (req.session.views) {
        ++req.session.views
    } else {
        req.session.views = 1;
        body += 'First time visiting? view this page in several browsers :)';
    }
    
    var ip = utils.getClientIp(req).split(":").pop();
    res.render("home", {title: "home", ip: ip, body: body + "viewed " + req.session.views + " times"});
};

exports.indexGetHeadersMessage = function (req, res, next) {
    console.log(req.headers["host"]);
    console.log(req.headers["user-agent"]);
    next();
};