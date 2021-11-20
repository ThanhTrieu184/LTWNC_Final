const { AuthController } = require("../controllers/api");
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

  app.post("/api/auth/login", AuthController.login);
  app.post("/api/auth/login-google", AuthController.loginGoogle);
  app.delete("/api/auth/logout", verifyToken, AuthController.logout);
  app.post("/api/auth/verifyUser", verifyToken, AuthController.verifyUser);
};
