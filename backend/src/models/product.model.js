const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // 🔥 NEW FIELD — PRODUCT IMAGES
    images: {
      type: [String], // array of image URLs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ SAFE EXPORT (overwrite error avoid)
module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
