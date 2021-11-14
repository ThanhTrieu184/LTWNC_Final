const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const models = {};

models.mongoose = mongoose;

models.department = require("./department.model");
models.class = require("./class.model");
models.role = require("./role.model");
models.user = require("./user.model");
models.token = require("./token.model");

module.exports = models;
