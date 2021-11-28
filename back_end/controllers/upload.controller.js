const { uploadSingle, uploadMultiple } = require("../cloudinary");

const uploadSingleFile = async (path) => {
  const result = await uploadSingle(path);
  return result;
};

const uploadMultipleFiles = async (req, res) => {
  let res_promises = req.files.map(
    (file) =>
      new Promise((resolve, reject) => {
        uploadMultiple(file.path).then((result) => {
          resolve(result);
        });
      })
  );

  Promise.all(res_promises)
    .then(async (arrImg) => {
      res.json(req.files);
    })
    .catch((error) => {
      console.error("> Error>", error);
    });
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
