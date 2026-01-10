const Category = require("../models/category.model");
const Product = require("../models/product.model");

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name required" });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.create({
      name,
      slug,
      status,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Category creation failed" });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, status },
      { new: true }
    );

    res.json(category);
  } catch {
    res.status(500).json({ message: "Category update failed" });
  }
};


// SAFE DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // 1️⃣ Find category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // 2️⃣ Check if any product uses this category
    const productCount = await Product.countDocuments({
      category: category.name,
    });

    if (productCount > 0) {
      return res.status(400).json({
        message:
          "Category is used by products. Please reassign or delete those products first.",
      });
    }

    // 3️⃣ Safe to delete
    await category.deleteOne();

    return res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return res.status(500).json({
      message: "Failed to delete category",
    });
  }
};
