const checkCreatePostRequest = (req, res, next) => {
  const { postDesc, videoLink } = req.body;
  const file = req.file;
  if (!postDesc || postDesc.length === 0) {
    return res.status(422).send("Mô tả bài viết không được để trống!");
  }
  if (!file && !videoLink) {
    return res
      .status(422)
      .send("Thêm hình ảnh hoặc được dẫn tới một video youtube!");
  }
  next();
};

// const isPostBelongToUser = () => {
//   const {postId}
// }

module.exports = {
  checkCreatePostRequest,
};
