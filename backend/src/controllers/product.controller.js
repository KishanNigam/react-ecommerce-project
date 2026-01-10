const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ count: products.length, products });
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, stock, category, status } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name & price required" });
    }

    const images = (req.files || []).map(
      (f) => `/uploads/products/${f.filename}`
    );

    const product = await Product.create({
      name,
      sku,
      price,
      stock,
      category,
      status,
      images,
    });

    res.status(201).json({ message: "Product created", product });
  } catch {
    res.status(500).json({ message: "Create failed" });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, price, stock, category, status, removedImages } =
      req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Not found" });

    let images = product.images || [];

    if (removedImages) {
      const removed = JSON.parse(removedImages);
      images = images.filter((img) => !removed.includes(img));
    }

    const newImages = (req.files || []).map(
      (f) => `/uploads/products/${f.filename}`
    );
    images = [...images, ...newImages];

    product.name = name;
    product.sku = sku;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.status = status;
    product.images = images;

    await product.save();
    res.json({ message: "Product updated", product });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// 🔥 DELETE product + images
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete images from disk
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
