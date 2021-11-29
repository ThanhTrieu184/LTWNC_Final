const { PostController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");
const { checkCreatePostRequest } = require("../middlewares/postRequest");
const uploadMulter = require("../multer");

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
    "/api/posts/create",
    [verifyToken, uploadMulter.single("image"), checkCreatePostRequest],
    PostController.createNewPost
  );
};
