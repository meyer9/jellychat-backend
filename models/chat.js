var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    chat: String,
    created: Date,
    sentBy: [Schema.Types.ObjectId]
});

var Chats = mongoose.model("Chat", chatSchema)

module.exports = Chats;
