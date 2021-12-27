const checkCreatePostRequest = (req, res, next) => {
  const { postDesc } = req.body;
  if (!postDesc || postDesc.length === 0) {
    return res.status(422).send("Mô tả bài viết không được để trống!");
  }

  next();
};

module.exports = {
  checkCreatePostRequest,
};
