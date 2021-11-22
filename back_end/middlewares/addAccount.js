const bcrypt = require("bcryptjs");
const models = require("../models");
const User = models.user;

const addAccount = (req, res, next) => {
  const { newPass, confirmPass } = req.body;
  if (newPass !== confirmPass) {
    return res.status(401).send({
      message: "Mật khẩu xác nhận phải giống với mật khẩu mới!",
    });
  }
  next();
}

module.exports = {
  addAccount,
};
