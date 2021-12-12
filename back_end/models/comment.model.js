const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    comment_content: String,
    commented_date: String,
    commented_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  })
);

module.exports = Comment;
