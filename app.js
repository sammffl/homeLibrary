var express = require('express');
var app = express();
var admin = express();
var config = require("./config.json");

app.get('/', function (req, res) {
    res.send('Hello World')
});

admin.get("/", function (req, res) {
    res.send('admin page');
});

app.use("/admin", admin);


app.listen(3000);
console.log('Express started on port 3000');