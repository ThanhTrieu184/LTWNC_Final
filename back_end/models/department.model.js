const mongoose = require("mongoose");

const Department = mongoose.model(
  "Department",
  new mongoose.Schema({
    department_name: String,
  })
);

module.exports = Department;
