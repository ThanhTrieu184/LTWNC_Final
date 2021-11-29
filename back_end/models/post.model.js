const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    post_caption: String,
    post_video_id: String,
    post_image_url: String,
    posted_date: String,
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Post;
