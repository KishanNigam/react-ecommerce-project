import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { fetchProducts, deleteProduct } from "../../services/product.service";
import "../../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  // ✅ NEW: category filter state
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const location = useLocation();
  const navigate = useNavigate();

  const load = () =>
    fetchProducts()
      .then((d) => setProducts(d.products || []))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setConfirmId(null);
    load();
  };

  // ✅ NEW: derive unique categories from products (SAFE)
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // ✅ NEW: filtered products (frontend only)
  const filteredProducts = useMemo(() => {
    if (categoryFilter === "ALL") return products;
    return products.filter((p) => p.category === categoryFilter);
  }, [products, categoryFilter]);

  return (
    <AdminLayout>
      <div className="products-page">
        <div className="products-top">
          <h1>Products</h1>

          <div style={{ display: "flex", gap: 12 }}>
            {/* 🔥 CATEGORY FILTER */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="category-filter"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              className="btn-primary"
              onClick={() => navigate("/admin/add-product")}
            >
              + Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products-table-card">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.images?.length ? (
                        <img
                          src={`http://localhost:5000${p.images[0]}`}
                          className="product-thumb"
                          onClick={() =>
                            setPreviewImg(
                              `http://localhost:5000${p.images[0]}`
                            )
                          }
                        />
                      ) : (
                        <div className="no-image">N/A</div>
                      )}
                    </td>

                    <td>{p.name}</td>
                    <td>{p.sku || "-"}</td>

                    <td>
                      {p.category ? (
                        <span className="category-badge">
                          {p.category}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>

                    <td>
                      <span
                        className={`status ${
                          p.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="icon-btn"
                        onClick={() =>
                          navigate(`/admin/products/${p._id}/edit`)
                        }
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => setConfirmId(p._id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CONFIRM MODAL */}
        {confirmId && (
          <div className="image-overlay">
            <div className="confirm-box">
              <p>Delete this product permanently?</p>
              <div className="form-actions">
                <button
                  className="btn-primary danger"
                  onClick={() => handleDelete(confirmId)}
                >
                  Delete
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setConfirmId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* IMAGE PREVIEW */}
        {previewImg && (
          <div
            className="image-overlay"
            onClick={() => setPreviewImg(null)}
          >
            <img src={previewImg} alt="Preview" />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Products;
