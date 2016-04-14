"use strict";

var fs = require("fs");

var doc = fs.readFileSync("../config.json", "utf8");

console.log(doc);
var uuid = require("node-uuid");
console.log(uuid.v1());

var db = require("../models");

var entity = new db.user({
    user_id: "11",
    name: "text",
    ins_date: Date.now(),
    upd_date: Date.now()
});
entity.save(function (err, doc) {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});