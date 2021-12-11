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
  app.get(
    "/api/posts/:userId/profile/:page",
    verifyToken,
    PostController.getPosts
  );
  app.get("/api/posts/:postId/detail", verifyToken, PostController.getPostById);
  app.patch(
    "/api/posts/:postId/edit",
    [verifyToken, uploadMulter.single("image")],
    PostController.updatePost
  );
  app.delete(
    "/api/posts/:postId/delete",
    verifyToken,
    PostController.deletePost
  );
};
