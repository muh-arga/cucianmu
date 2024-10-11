const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `${Date.now()}-${filename}`);
  },
});

// File filter
const filterFile = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(
      new Error(
        "Invalid file type. Only jpg, jpeg, png image files are allowed."
      ),
      false
    );
  }
};

// Upload middleware
const upload = multer({
  storage,
  fileFilter: filterFile,
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = upload;
