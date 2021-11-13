const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    google_id: String,
    image_url: String,
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    department_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
  })
);

module.exports = User;
