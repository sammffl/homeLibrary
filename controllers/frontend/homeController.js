var utils = require("../../common/utils");
//var db = require("../../models");

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
    var detailModel = db.s_user_profile_data;
    var doc = null;
    detailModel.find({type: 20, user_id: 875233}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            doc = docs;
            console.log(docs);
            if (req.body.token) res.cookie('token', doc[0].user_id, {maxAge: minute});
            res.redirect('home');
        }
        db.mongoDB.close();
    });


};
exports.unsignUser = function (req, res, next) {
    res.clearCookie("token");
    res.redirect('home');
};