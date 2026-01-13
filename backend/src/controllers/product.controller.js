const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

// ==============================
// GET all products
// ==============================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ==============================
// CREATE product
// ==============================
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, mrp, stock, category, status, description } =
      req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const images = (req.files || []).map(
      (f) => `/uploads/products/${f.filename}`
    );

    const product = await Product.create({
      name,
      sku,
      price,
      mrp: mrp || 0,
      stock,
      category,
      status,
      description: description || "",
      images,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create product failed" });
  }
};

// ==============================
// UPDATE product
// ==============================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sku,
      price,
      mrp,
      stock,
      category,
      status,
      description,
      removedImages,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Existing images
    let images = product.images || [];

    // Remove images
    if (removedImages) {
      const removed = JSON.parse(removedImages);
      images = images.filter((img) => !removed.includes(img));
    }

    // Add new images
    const newImages = (req.files || []).map(
      (f) => `/uploads/products/${f.filename}`
    );
    images = [...images, ...newImages];

    // Update fields
    product.name = name;
    product.sku = sku;
    product.price = price;
    product.mrp = mrp || 0;
    product.stock = stock;
    product.category = category;
    product.status = status;
    product.description = description || "";
    product.images = images;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// ==============================
// DELETE product
// ==============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from disk
    (product.images || []).forEach((imgPath) => {
      const fullPath = path.join(__dirname, "..", "..", imgPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
