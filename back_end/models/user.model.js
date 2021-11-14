const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: { type: String, default: null },
    password: String,
    google_id: { type: String, default: null },
    image_url: { type: String, default: null },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    department_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null,
      },
    ],
  })
);

module.exports = User;
