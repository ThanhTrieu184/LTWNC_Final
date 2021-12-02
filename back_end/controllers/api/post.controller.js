const models = require("../../models");
const moment = require("moment");
const Post = models.post;
const { uploadSingleFile } = require("../upload.controller");
const User = require("../../models/user.model");

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
  post.save(async (err, p) => {
    let result = await Post.populate(p, {
      path: "posted_by",
      select: "username",
    });
    if (err) {
      return res.status(500).send({ message: "Tạo bài viết thất bại!" });
    }
    return res.status(201).send({
      message: "Tạo bài viết thành công",
      post: result,
    });
  });
};

exports.getPosts = async (req, res) => {
  const perPage = 5;
  const page = req.params.page || 1;

  Post.find()
    .sort({ _id: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate("posted_by", "username")
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send("Có lỗi khi tải bài viết!");
      }
      Post.countDocuments((err, count) => {
        if (err) return res.status(500).send("Có lỗi khi tải bài viết!");
        res.status(200).send({
          message: "Tải thành công " + perPage + " bài viết",
          posts: posts,
          count: count,
        });
      });
    });
};
