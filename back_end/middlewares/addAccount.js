const models = require("../models");
const User = models.user;
const { body, validationResult } = require("express-validator");

const addAccount = (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(401).send({
      message: "Mật khẩu xác nhận phải giống với mật khẩu mới!",
    });
  }
  User.find({ username: username }).then((user) => {
    if (user.length !== 0) {
      return res.status(401).send({
        message: "Tên đăng nhập đã tồn tại",
      });
    }
    next();
  })
}

const checkCreateUserRequest = [
  body("username", "Tên đăng nhập không được để trống").not().isEmpty(),
  body("username", "Tên đăng nhập ít nhất 2 kí tự").isLength({ min: 2 }),
  body("username", "Tên đăng nhập không quá 100 kí tự").isLength({ max: 100 }),
  body("email", "Địa chỉ gmail không được để trống").not().isEmpty(),
  body("email", "Email không hợp lệ").isEmail(),
  body("password", "Mật khẩu phải ít nhất 6 kí tự").isLength({ min: 6 }),
  //body("password", "Mật khẩu không giống nhau").equals(req),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res
        .status(422)
        .send({ message: "Input không hợp lệ", data: errs });
    }
    next();
  },
];

module.exports = {
  addAccount,
  checkCreateUserRequest
};
