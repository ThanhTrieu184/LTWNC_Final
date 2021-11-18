const bcrypt = require("bcryptjs");
const models = require("../models");
const User = models.user;

const changePassword = (req, res, next) => {
  const { oldPass, newPass, confirmPass } = req.body;
  const userId = req.userId;
  if (newPass !== confirmPass) {
    return res.status(401).send({
      message: { password: "Mật khẩu xác nhận phải giống với mật khẩu mới!" },
    });
  }
  if (oldPass === newPass) {
    return res.status(401).send({
      message: {
        password: "Mật khẩu cũ và mật khẩu mới không được giống nhau!",
      },
    });
  }
  User.findById(userId)
    .then((user) => {
      const validPassword = bcrypt.compareSync(oldPass, user.password);
      if (!validPassword) {
        return res.status(401).send({
          message: { password: "Mật khẩu cũ không đúng!" },
        });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).send({
        message: { password: "Chức năng bị lỗi!" },
      });
    });
};

module.exports = {
  changePassword,
};
