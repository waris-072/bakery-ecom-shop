import multer from "multer";

const storage = multer.memoryStorage();
const allowedTypes = [ "image/jpeg", "image/jpg", "image/png", "image/webp", ];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."), false);
  }
};


const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;