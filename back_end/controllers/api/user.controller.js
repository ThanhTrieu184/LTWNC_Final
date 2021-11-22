const models = require("../../models");
const User = models.user;
const Role = models.role;
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

exports.addAccount = async (req, res) => {
  const { username, email, password, departments } = req.body;
  const departmentIds = departments.map(d => d._id)
  const role = await Role.findOne({ role_name: "Department" })
  const user = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password),
    department_id: departmentIds,
    role_id: role._id
  })
  user.save().then((result) => {
    return res.status(200).send({
      message: "Tạo tài khoản thành công",
      data: result,
    })
  }).catch((err) => {
    return res.status(400).send({
      message: "Tạo tài khoản thất bại",
    });
  })
}