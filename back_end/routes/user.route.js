const { UserController } = require("../controllers/api");
const { verifyToken, isAdmin } = require("../middlewares/authJWT");
const { changePassword } = require("../middlewares/changePassword");
const uploadMulter = require("../multer");

const {
  addAccount,
  checkCreateUserRequest,
  updateAccount,
} = require("../middlewares/addAccount");

module.exports = (app) => {
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
    [verifyToken, updateAccount, uploadMulter.single("image")],
    UserController.updateProfile
  );
};
