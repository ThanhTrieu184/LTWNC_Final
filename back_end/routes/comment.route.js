const { CommentController } = require("../controllers/api");
const { verifyToken } = require("../middlewares/authJWT");

module.exports = (app) => {
  app.post(
    "/api/comments/create",
    verifyToken,
    CommentController.createNewComment
  );
  app.get("/api/comments/:postId", verifyToken, CommentController.getComments);

  app.patch(
    "/api/comments/:commentId/edit",
    verifyToken,
    CommentController.updateComment
  );
  app.delete(
    "/api/comments/:commentId/delete",
    verifyToken,
    CommentController.deleteComment
  );
};
