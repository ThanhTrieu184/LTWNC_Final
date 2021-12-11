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
  post.save(async (err, p) => {
    let result = await Post.populate(p, {
      path: "posted_by",
      select: ["_id", "username", "image_url"],
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
  const perPage = 10;
  const page = req.params.page || 1;
  const { userId } = req.params;
  const cons = {};
  if (userId) {
    cons.posted_by = userId;
  }
  Post.find(cons)
    .sort({ _id: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate("posted_by", ["_id", "username", "image_url"])
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send("Có lỗi khi tải bài viết!");
      }
      Post.countDocuments(cons, (err, count) => {
        if (err) return res.status(500).send("Có lỗi khi tải bài viết!");
        if (page > Math.ceil(count / perPage))
          return res.status(400).send("Vượt quá số trang hiện có!");
        res.status(200).send({
          message: "Tải bài viết thành công",
          posts: posts,
          count: count,
          userId: userId,
        });
      });
    });
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .populate("posted_by", ["_id", "username", "image_url"])
    .exec((err, post) => {
      if (err) {
        return res.status(500).send("Có lỗi khi tải bài viết!");
      }
      res.status(200).send({
        message: "Tải bài viết thành công",
        post: post,
      });
    });
};

exports.updatePost = async (req, res) => {
  const file = req.file;
  const { postDesc, videoLink, image } = req.body;
  const post = {
    post_caption: postDesc,
  };
  const { postId } = req.params;

  if (file) {
    let response = await uploadSingleFile(file.path);
    post.post_image_url = response.url;
    post.post_video_id = "";
  } else if (typeof image === "string") {
    post.post_image_url = image;
    post.post_video_id = "";
  } else {
    post.post_image_url = "";
    post.post_video_id = videoLink.split("=")[1];
  }
  Post.findByIdAndUpdate(postId, { $set: post }, { returnOriginal: false })
    .populate("posted_by", ["_id", "username", "image_url"])
    .exec()
    .then((p) => {
      return res
        .status(200)
        .send({ message: "Cập nhật bài viết thành công", post: p });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Có lỗi khi cập nhật bài viết!" });
    });
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId, (err, post) => {
    if (err) {
      return res.status(500).send({ message: "Có lỗi khi xóa bài viết!" });
    }
    if (post) {
      return res.status(200).send({
        message: "Xóa bài viết thành công",
        deletedPost: post,
      });
    }
    res.status(404).send({
      message: "Không tìm thấy bài viết!",
    });
  });
};
