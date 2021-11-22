const models = require("../../models");
const User = models.user;
const bcrypt = require("bcryptjs");

exports.changePass = (req, res) => {
  const userId = req.userId;
  const { newPass } = req.body;
  User.updateOne(
    {
      _id: userId,
    },
    { $set: { password: bcrypt.hashSync(newPass) } }
  )
    .then((user) => {
      return res.status(200).send({
        message: "Đổi mật khẩu thành công",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Đổi mật khẩu thất bại",
      });
    });
};

exports.addAccount = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  user.save().then((result) => {
    return res.status(200).send({
      message: "Tạo tài khoản thành công",
    })
  }).catch((err) => {
    return res.status(400).send({
      message: "Tạo tài khoản thất bại",
    });
  })
}