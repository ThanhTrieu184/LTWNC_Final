const jwt = require("jsonwebtoken");
const models = require("../models");
const config = require("../config");
const User = models.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .populate("role_id")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (user.role_id.role_name === "Admin") {
        next();
        return;
      }
      return res.status(403).send({ message: "Require Admin Role!" });
    });
};

const isDepartment = (req, res, next) => {
  User.findById(req.userId)
    .populate("role_id")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (user.role_id.role_name === "Department") {
        next();
        return;
      }
      return res.status(403).send({ message: "Require Department Role!" });
    });
};

const authJWT = {
  verifyToken,
  isAdmin,
  isDepartment,
};

module.exports = authJWT;
