const models = require("../models");
const User = models.user;

const isDepartmentAbleToUpdate = (req, res, next) => {
  const { department } = req.body;
  User.findById(req.userId).then((user) => {
    if (user.department_id.includes(department._id)) {
      next();
    } else {
      return res.status(401).send({
        message: "Bạn không có quyền chỉnh sửa thông báo",
      });
    }
  });
};

const isDepartmentAbleToDelete = (req, res, next) => {
  const { departmentId } = req.body;
  User.findById(req.userId).then((user) => {
    if (user.department_id.includes(departmentId)) {
      next();
    } else {
      return res.status(401).send({
        message: "Bạn không có quyền xóa thông báo này!",
      });
    }
  });
};

module.exports = {
  isDepartmentAbleToUpdate,
  isDepartmentAbleToDelete,
};
