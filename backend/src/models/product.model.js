const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFO
    ========================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      trim: true,
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

    /* =========================
       PRICING & STOCK
    ========================= */
    price: {
      type: Number, // selling price
      required: true,
    },

    mrp: {
      type: Number, // actual / original price
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    /* =========================
       DESCRIPTION
    ========================= */
    description: {
      type: String,
      trim: true,
      default: "",
    },

    /* =========================
       IMAGES
    ========================= */
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ SAFE EXPORT (avoid overwrite error)
module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
