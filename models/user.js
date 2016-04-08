var Schema = require("mongoose").Schema;

module.exports = function (db) {
    var userSchema = new Schema({
        user_id: {type: Number},
        name: {type: String},
        ins_date: {type: Date},
        upd_date: {type: Date}
    });
    return db.model("user", userSchema, "user");
};