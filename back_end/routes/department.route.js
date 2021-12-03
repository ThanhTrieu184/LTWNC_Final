const { DepartmentController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");

module.exports = (app) => {
  app.get(
    "/api/departments/list",
    verifyToken,
    DepartmentController.getAllDepartments
  );
  app.get(
    "/api/departments/mine",
    verifyToken,
    DepartmentController.getDepartmentsByUser
  );
};
