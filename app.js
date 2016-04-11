var express = require('express'),
    https = require("https"),
    http = require('http'),
    path = require('path'),
    cors = require('cors');

var app = express();
var controllers = require("./controllers");
var apiV1 = require("./api/v1");
var config = require("./config")();

app.use('/static/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components/', express.static(path.join(__dirname, "bower_components")));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use("/api/v1", cors(), apiV1);
app.use("/", controllers);

console.log(path.join(__dirname, "bower_components"));
function init() {
    http.createServer(app).listen(config.httpPort || 8801);
    var options = {};
    https.createServer(options, app).listen(config.httpsPort || 8802);
    console.log('Express started http on port ', config.httpPort);
    console.log('Express started https on port ', config.httpsPort);
}

init();

process.on('uncaughtException', function (err) {
    console.log('未捕捉到的错误', err);
});