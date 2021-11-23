const { DepartmentController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

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
