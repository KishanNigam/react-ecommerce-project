import React, { useState, useEffect } from "react"; // ✅ useEffect added
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { createProduct } from "../../services/product.service";
import { fetchCategories } from "../../services/category.service"; // ✅ NEW
import "../../styles/products.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
  });

  const [categories, setCategories] = useState([]); // ✅ NEW (safe)
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);

  // ✅ NEW: fetch categories (ONLY Active)
  useEffect(() => {
    fetchCategories().then((data) => {
      const activeCategories = data.filter(
        (cat) => cat.status === "Active"
      );
      setCategories(activeCategories);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("Max 5 images allowed");
      return;
    }
    setImages((p) => [...p, ...files]);
    setPreviews((p) => [
      ...p,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (idx) => {
    setImages((p) => p.filter((_, i) => i !== idx));
    setPreviews((p) => p.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("sku", formData.sku);
      fd.append("price", Number(formData.price));
      fd.append("stock", Number(formData.stock));
      fd.append("category", formData.category);
      fd.append("status", formData.status);
      images.forEach((img) => fd.append("images", img));

      await createProduct(fd);

      navigate("/admin/products", { state: { productAdded: true } });
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="products-page">
        <h1>Add Product</h1>

        <div className="products-table-card">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>SKU</label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            {/* 🔥 ONLY THIS PART CHANGED */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div
              className="form-group"
              style={{ gridColumn: "span 2" }}
            >
              <label>Product Images (max 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
              />
            </div>

            {previews.length > 0 && (
              <div
                className="image-preview-grid"
                style={{ gridColumn: "span 2" }}
              >
                {previews.map((src, i) => (
                  <div className="image-preview" key={i}>
                    <img src={src} alt="preview" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="form-actions">
              <button
                className="btn-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
