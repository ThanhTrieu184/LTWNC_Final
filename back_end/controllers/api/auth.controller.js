const models = require("../../models");
const config = require("../../config");
const User = models.user;
const Token = models.token;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("role_id")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res
          .status(404)
          .send({ message: { username: "Username is incorrect!" } });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: { password: "Invalid Password!" },
        });
      }

      const token = generateToken({ id: user._id, username: user.username });
      const tk = new Token({
        user_id: user._id,
        token: token,
      });
      tk.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role_id.role_name,
        accessToken: token,
      });
    });
};

exports.logout = (req, res) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }

  Token.deleteOne({ token: token }, (err, tk) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (tk.deletedCount === 0) {
      return res.status(400).send({ message: "Logout fail" });
    }
    res.status(200).send({ message: "Logout success." });
  });
};

const generateToken = (credentials) => {
  return jwt.sign(
    { id: credentials.id, username: credentials.username },
    config.JWT_SECRET,
    {
      expiresIn: config.tokenLife,
    }
  );
};
