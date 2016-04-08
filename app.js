var express = require('express'),
    https = require("https"),
    http = require('http'),
    path = require('path');

var app = express();
var controllers = require("./controllers");
//var router = require("./routers/index");
//var admin = require("./routers/admin");

var config = require("./config")();

app.use('/static/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components/', express.static(path.join(__dirname, "bower_components")));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use("/", controllers);

console.log(path.join(__dirname, "bower_components"));
function init() {
    http.createServer(app).listen(config.httpPort || 8808);
    var options = {};
    https.createServer(options, app).listen(config.httpsPort || 8809);
    console.log('Express started http on port ', config.httpPort);
    console.log('Express started https on port ', config.httpsPort);
}

init();

process.on('uncaughtException', function (err) {
    console.log('未捕捉到的错误', err);
});