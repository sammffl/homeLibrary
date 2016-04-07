var express = require('express'),
    https = require("https"),
    http = require('http'),
    path = require('path');

var app = express();
var router = require("./routers/index");
var admin = require("./routers/admin");

var config = require("./config.json");

app.use('/static/', express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use('/', router);
app.use("/admin", admin);


function init() {
    http.createServer(app).listen(config.http_port || 8808);
    var options = {};
    https.createServer(options, app).listen(config.https_port || 8809);
    console.log('Express started http on port ', config.http_port);
    console.log('Express started https on port ', config.https_port);
}

init();
