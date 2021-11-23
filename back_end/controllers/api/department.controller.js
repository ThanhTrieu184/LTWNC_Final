const models = require("../../models");
const Department = models.department;
const User = models.user;

exports.getAllDepartments = async (req, res) => {
  const departments = await Department.find({});
  return res.status(200).send(departments);
};

exports.getDepartmentsByUser = async (req, res) => {
  const departments = await User.findById(req.userId);
  return res.status(200).send(departments.department_id);
};
