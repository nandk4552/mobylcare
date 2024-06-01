const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = (req, res, next) => {
  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "File upload error",
        err,
      });
    }

    req.body = fields;
    req.files = files;
    next();
  });
};

module.exports = upload;
