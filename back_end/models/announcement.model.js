const mongoose = require("mongoose");

const Announcement = mongoose.model(
  "Announcement",
  new mongoose.Schema({
    announcement_title: String,
    announcement_content: String,
    published_date: String,
    announcement_updated_at: String,
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    published_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    announcement_updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_important: Boolean,
  })
);

module.exports = Announcement;
