const multer = require("multer");
const moment = require("moment");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("DDMMYYYY_hhmmss") + "_" + file.originalname); // mặc định sẽ save name của hình ảnh
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
