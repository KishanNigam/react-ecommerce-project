const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { protectAdmin } = require("../middleware/auth.middleware");

router.post(
  "/products",
  protectAdmin,
  upload.array("images", 5),
  (req, res) => {
    const files = req.files.map((file) => ({
      filename: file.filename,
      path: `/uploads/products/${file.filename}`,
    }));

    res.json({
      message: "Images uploaded successfully",
      files,
    });
  }
);

module.exports = router;
