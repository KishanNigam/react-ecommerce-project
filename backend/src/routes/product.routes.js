const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { protectAdmin } = require("../middleware/auth.middleware");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", protectAdmin, getAllProducts);
router.post("/", protectAdmin, upload.array("images", 5), createProduct);
router.put("/:id", protectAdmin, upload.array("images", 5), updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

module.exports = router;
