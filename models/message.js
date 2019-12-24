const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    message: {
        type: String,
    }
});

module.exports.Message = mongoose.model("Agent", messageSchema);