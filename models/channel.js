var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var channelSchema = new Schema({
    mods: [String],
    timeouts: [Schema.Types.ObjectId]
});



var Channels = mongoose.model("Channel", channelSchema)

module.exports = Channels;
