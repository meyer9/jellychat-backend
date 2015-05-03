var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    message: String,
    room: String,
    created: Date,
    nick: String
});

var Chats = mongoose.model("Chat", chatSchema)

module.exports = Chats;
