const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploader = (uploadDir, fieldName, isMultiple = false, maxFiles = 1) => {
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join( __dirname , uploadDir, fieldName);
      if (!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  };

  const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB limit

  const upload = isMultiple
    ? multer({ storage, limits, fileFilter }).array(fieldName, maxFiles)
    : multer({ storage, limits, fileFilter }).single(fieldName);

  return upload;
};

module.exports = { createUploader };
