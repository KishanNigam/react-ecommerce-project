const express = require("express");
const router = express.Router();
const { protectAdmin } = require("../middleware/auth.middleware");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// router.get("/", protectAdmin, getCategories);
router.get("/", getCategories);
router.post("/", protectAdmin, createCategory);
router.put("/:id", protectAdmin, updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);

module.exports = router;
