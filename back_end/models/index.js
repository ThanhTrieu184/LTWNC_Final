const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const models = {};

models.mongoose = mongoose;

models.user = require("./user.model");
models.role = require("./role.model");
models.token = require("./token.model");
models.department = require("./department.model");

module.exports = models;
