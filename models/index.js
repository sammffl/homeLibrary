var fs = require("fs"),
    path = require("path"),
    mongoose = require("mongoose"),
    config = require("../config")();
var db = {};
console.log(config);
var mongoDB = mongoose.createConnection(config.mongoDB);
mongoDB.on("error", function (err) {
    console.log(err);
});
mongoDB.on("open", function () {
    console.log("mongoDB success");
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

db["mongoDB"] = mongoDB;
module.exports = db;

