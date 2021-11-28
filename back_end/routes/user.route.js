const { UserController } = require("../controllers/api");
const { verifyToken, isAdmin } = require("../middlewares/authJWT");
const { changePassword } = require("../middlewares/changePassword");
const uploadMulter = require("../multer");

const {
  addAccount,
  checkCreateUserRequest,
} = require("../middlewares/addAccount");

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
  app.post(
    "/api/users/create",
    [verifyToken, isAdmin, checkCreateUserRequest, addAccount],
    UserController.addAccount
  );
  app.post(
    "/api/users/update",
    [verifyToken, uploadMulter.single("image")],
    UserController.updateProfile
  );
};
