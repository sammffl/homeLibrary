var fs = require("fs"),
    path = require("path"),
    mongoose = require("mongoose"),
    config = fs.readFileSync('config.json', "utf8");
var db = {};
//console.log(config)
var mongoDB = mongoose.connect(config.mongoDB);
mongoDB.connection.on("error", function (err) {
    console.log(err);
});
mongoDB.connection.on("open", function () {
    console.log("success");
});

fs.readdirSync(__dirname)
    .filter(function (file) {
        //console.log(file);
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(mongoDB);
        db[model.collection.name] = model;
    });

module.exports = db;

