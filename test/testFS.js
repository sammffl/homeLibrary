var fs = require("fs");

var doc = fs.readFileSync("../config.json","utf8");

console.log(doc);