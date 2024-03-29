const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const models = {};

models.mongoose = mongoose;

models.department = require("./department.model");
models.class = require("./class.model");
models.role = require("./role.model");
models.user = require("./user.model");
models.token = require("./token.model");
models.post = require("./post.model");
models.announcement = require("./announcement.model");
models.comment = require("./comment.model");
module.exports = models;
