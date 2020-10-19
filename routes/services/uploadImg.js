const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
}).single('myimage');

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|gif|png/;
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  let mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, true);
  } else {
    return callback('Error: Images only');
  }
}

uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      if (req.file === undefined) {
        return;
      }
      res.status(200).json({ message: 'image uploaded successfully' });
    }
  });
};

module.exports = { uploadImage };
