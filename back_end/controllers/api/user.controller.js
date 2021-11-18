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
        message: { password: "Đổi mật khẩu thành công" },
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: { password: "Đổi mật khẩu thất bại" },
      });
    });
};
