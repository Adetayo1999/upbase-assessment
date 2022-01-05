const multer = require("multer");

const uploader = multer({
  limits: {
    fileSize: 500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|png|jpeg)$/)) {
      cb(new Error("File Format Not Supported"));
      return;
    }
    cb(undefined, true);
  },
});

module.exports = uploader;
