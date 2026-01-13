import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { fetchProducts, updateProduct } from "../../services/product.service";
import { fetchCategories } from "../../services/category.service";
import "../../styles/products.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [categories, setCategories] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      const product = data.products.find((p) => p._id === id);
      if (product) {
        setFormData(product);
        setExistingImages(product.images || []);
      }
    });

    fetchCategories().then((data) => {
      const active = data.filter((cat) => cat.status === "Active");
      setCategories(active);
    });
  }, [id]);

  if (!formData) {
    return (
      <AdminLayout>
        <p style={{ padding: 20 }}>Loading...</p>
      </AdminLayout>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const removeExistingImage = (img) => {
    setRemovedImages((p) => [...p, img]);
    setExistingImages((p) => p.filter((i) => i !== img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("sku", formData.sku);
    fd.append("price", formData.price);
    fd.append("mrp", formData.mrp || 0); // ✅ NEW
    fd.append("stock", formData.stock);
    fd.append("category", formData.category);
    fd.append("status", formData.status);
    fd.append("description", formData.description || ""); // ✅ NEW
    fd.append("removedImages", JSON.stringify(removedImages));
    newImages.forEach((img) => fd.append("images", img));

    await updateProduct(id, fd);
    navigate("/admin/products", { state: { productUpdated: true } });
  };

  return (
    <AdminLayout>
      <div className="products-page">
        <h1>Edit Product</h1>
        <p className="page-subtitle">
          Update product details, images and status
        </p>

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
              <input name="sku" value={formData.sku} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Selling Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>MRP (₹)</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp || ""}
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

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category || ""}
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

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Description (About this item)</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Existing Images</label>
              {existingImages.length === 0 && (
                <p className="muted-text">No images uploaded</p>
              )}
              <div className="image-preview-grid">
                {existingImages.map((img) => (
                  <div className="image-preview" key={img}>
                    <img src={`http://localhost:5000${img}`} alt="" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Add New Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setNewImages(Array.from(e.target.files))}
              />
            </div>

            <div className="form-actions">
              <button className="btn-primary" disabled={saving}>
                {saving ? "Updating..." : "Update Product"}
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

export default EditProduct;
