const models = require("../../models");
const moment = require("moment");
const Post = models.post;
const { uploadSingleFile } = require("../upload.controller");

exports.createNewPost = async (req, res) => {
  const file = req.file;
  const { postDesc, videoLink } = req.body;
  const post = new Post({
    post_caption: postDesc,
    posted_by: req.userId,
    posted_date: moment().format("DD/MM/YYYY-hh:mm:ss"),
  });
  if (file) {
    let response = await uploadSingleFile(file.path);
    post.post_image_url = response.url;
  } else {
    post.post_video_id = videoLink.split("=")[1];
  }
  post.save((err, p) => {
    if (err) {
      return res.status(500).send({ message: "Tạo bài viết thất bại!" });
    }
    return res
      .status(201)
      .send({ message: "Tạo bài viết thành công", post: p });
  });
};
