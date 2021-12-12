const models = require("../../models");
const moment = require("moment");
const Comment = models.comment;

exports.createNewComment = async (req, res) => {
  const { commentContent, postId } = req.body;
  const cmt = new Comment({
    comment_content: commentContent,
    commented_by: req.userId,
    commented_date: moment().format("DD/MM/YYYY-HH:mm:ss"),
    post_id: postId,
  });

  cmt.save(async (err, c) => {
    let result = await Comment.populate(c, {
      path: "commented_by",
      select: ["username"],
    });
    if (err) {
      return res
        .status(500)
        .send({ message: "Thêm bình luận không thành công!" });
    }
    return res.status(201).send({
      message: "Thêm bình luận thành công",
      comment: result,
    });
  });
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;
  Comment.find({ post_id: postId })
    .populate("commented_by", ["username"])
    .exec()
    .then((comments) => {
      Comment.countDocuments({ post_id: postId }, (err, count) => {
        if (err) return res.status(500).send("Có lỗi khi tải bình luận!");
        return res.status(200).send({
          message: "Tải bình luận thành công",
          comments: comments,
          count: count,
        });
      });
    })
    .catch(() => {
      return res.status(500).send("Có lỗi khi tải bình luận!");
    });
};

exports.updateComment = async (req, res) => {
  const { commentId, commentContent } = req.body;
  const cmt = {
    comment_content: commentContent,
  };

  Comment.findByIdAndUpdate(commentId, { $set: cmt }, { returnOriginal: false })
    .populate("commented_by", ["username"])
    .exec()
    .then((c) => {
      return res
        .status(200)
        .send({ message: "Cập nhật bình luận thành công", comment: c });
    })
    .catch(() => {
      return res
        .status(500)
        .send({ message: "Có lỗi khi cập nhật bình luận!" });
    });
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  Comment.findByIdAndDelete(commentId, (err, cmt) => {
    if (err) {
      return res.status(500).send({ message: "Có lỗi khi xóa bình luận!" });
    }
    if (cmt) {
      return res.status(200).send({
        message: "Xóa bình luận thành công",
        deletedComment: cmt,
      });
    }
    res.status(404).send({
      message: "Không tìm thấy bình luận!",
    });
  });
};
