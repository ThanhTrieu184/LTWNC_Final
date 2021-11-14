const models = require("../../models");
const config = require("../../config");
const User = models.user;
const Token = models.token;
const Role = models.role;
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
          .send({ message: { username: "Tên đăng nhập không đúng!" } });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: { password: "Mật khẩu không hợp lệ!" },
        });
      }

      const token = generateToken(user._id);
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
        imageUrl: user.image_url,
      });
    });
};

exports.loginGoogle = async (req, res) => {
  const { uid, photoURL, email } = req.body;
  const role = await Role.findOne({ role_name: "Student" });
  User.findOne({
    google_id: uid,
  })
    .populate("role_id")
    .exec(async (err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (user) {
        const token = generateToken(user._id);
        new Token({ user_id: user._id, token: token }).save();
        return res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role_id.role_name,
          accessToken: token,
          imageUrl: user.image_url,
        });
      }
      const username = email.split("@")[0];
      new User({
        username: username,
        google_id: uid,
        image_url: photoURL,
        role_id: role._id,
        email: email,
        password: bcrypt.hashSync(username, 10),
      }).save((err, data) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        const token = generateToken(data._id);
        new Token({ user_id: data._id, token: token }).save();
        return res.status(200).send({
          id: data._id,
          username: data.username,
          email: data.email,
          role: data.role_id.role_name,
          accessToken: token,
          imageUrl: data.image_url,
        });
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
      return res.status(400).send({ message: "Đăng xuất thất bại!" });
    }
    res.status(200).send({ message: "Đăng xuất thành công." });
  });
};

const generateToken = (id) => {
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    expiresIn: config.tokenLife,
  });
};
