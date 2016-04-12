var express = require('express'),
    https = require("https"),
    http = require('http'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require("express-session");

var app = express();
var controllers = require("./controllers");
var apiV1 = require("./api/v1");
var config = require("./config")();

app.use('/static/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components/', express.static(path.join(__dirname, "bower_components")));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");
app.enable('verbose errors');
if ('production' == app.settings.env) app.disable('verbose errors');
app.use(cookieParser('SamMFFL'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'SamMFFL'
}));

app.use("/api/v1", cors(), apiV1);
app.use("/", controllers);

app.get('/404', function (req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function (req, res, next) {
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function (req, res, next) {
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('error/404', {url: req.url});
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.use(function (err, req, res, next) {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('error/500', {error: err});
});

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