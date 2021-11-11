const mongoose = require("mongoose");

const Token = mongoose.model(
  "Token",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: String,
  })
);

module.exports = Token;
