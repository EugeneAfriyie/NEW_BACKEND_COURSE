const multer = require("multer");
const path = require("path");

// storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// file filter
const checkFileType = function (req, file, cb) {
    if (!file || !file.mimetype) {
        cb(new Error("No file uploaded"), false);
        return;
    }

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// multer middleware
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: checkFileType,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

module.exports = uploadMiddleware;
