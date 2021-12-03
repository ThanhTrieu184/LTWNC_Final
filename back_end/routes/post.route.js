const { PostController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");
const { checkCreatePostRequest } = require("../middlewares/postRequest");
const uploadMulter = require("../multer");

module.exports = (app) => {
  app.post(
    "/api/posts/create",
    [verifyToken, uploadMulter.single("image"), checkCreatePostRequest],
    PostController.createNewPost
  );
  app.get("/api/posts/:page", verifyToken, PostController.getPosts);
};
