const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    class_name: String,
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  })
);

module.exports = Class;
