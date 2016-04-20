var path = require("path");
var moment = require("moment");
var Pageres = require("pageres");
var pageres = new Pageres({delay: 2})
    .src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
    .src('todomvc.com', ['1280x1024', '1920x1080'])
    //.dest(path.join(__dirname, 'pngs', moment(new Date()).format("YYYY-MM-DD")))
    .dest(__dirname)
    .run()
    .then(function () {
        console.log("done")
    });
//var day = moment(new Date()).format("YYYY-MM-DD");
//console.log(typeof day)
//
//var url = path.join(__dirname, 'pngs', moment(new Date()).format("YYYY-MM-DD"))
//console.log(url)