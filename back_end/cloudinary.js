const cloudinary = require("cloudinary").v2;
const config = require("./config");
const fs = require("fs");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

exports.uploadSingle = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(file, {
        folder: "ltwnc",
      })
      .then((result) => {
        if (result) {
          fs.unlinkSync(file);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      });
  });
};

exports.uploadMultiple = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(file, {
        folder: "ltwnc/posts",
      })
      .then((result) => {
        if (result) {
          fs.unlinkSync(file);
          resolve({
            url: result.secure_url,
            id: result.public_id,
            thumb1: reSizeImage(result.public_id, 200, 200),
            main: reSizeImage(result.public_id, 500, 500),
            thumb2: reSizeImage(result.public_id, 300, 300),
          });
        }
      });
  });
};

const reSizeImage = (id, h, w) => {
  return cloudinary.url(id, {
    height: h,
    width: w,
    crop: "scale",
    format: "jpg",
  });
};
