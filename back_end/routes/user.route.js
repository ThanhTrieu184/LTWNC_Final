const { UserController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");
const { changePassword } = require("../middlewares/changePassword");

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

  app.post(
    "/api/users/changePass",
    [verifyToken, changePassword],
    UserController.changePass
  );
};
