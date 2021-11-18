const models = require("../../models");
const Department = models.department;

exports.getAllDepartments = async (req, res) => {
  const departments = await Department.find({});
  return res.status(200).send(departments);
};
