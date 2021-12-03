const { AuthController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");

module.exports = (app) => {
  app.post("/api/auth/login", AuthController.login);
  app.post("/api/auth/login-google", AuthController.loginGoogle);
  app.delete("/api/auth/logout", verifyToken, AuthController.logout);
  app.post("/api/auth/verifyUser", verifyToken, AuthController.verifyUser);
};
