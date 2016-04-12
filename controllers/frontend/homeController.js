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
    var isSign = req.session.sign;
    res.render("home", {
        title: "home",
        ip: ip,
        body: body + "viewed " + req.session.views + " times",
        isSign: isSign
    });
};

exports.indexGetHeadersMessage = function (req, res, next) {
    console.log(req.headers["host"]);
    console.log(req.headers["user-agent"]);
    req.session.sign = !!req.cookies.token;
    next();
};

exports.signUser = function (req, res, next) {
    var minute = 60000;
    if (req.body.token) res.cookie('token', 1, {maxAge: minute});
    res.redirect('home');
};
exports.unsignUser = function (req, res, next) {
    res.clearCookie("token");
    res.redirect('home');
};