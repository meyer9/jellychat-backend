var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var timeoutSchema = new Schema({
    nick: String,
    time: Number // in seconds
});

var Timeouts = mongoose.model("Timeout", timeoutSchema)

module.exports = Timeouts;
