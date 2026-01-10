import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.service";
import "../../styles/categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", status: "Active" });

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", status: "Active" });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, status: cat.status });
    setShowModal(true);
  };

  const submit = async () => {
    if (!form.name) {
      alert("Category name required");
      return;
    }

    if (editing) {
      await updateCategory(editing._id, form);
    } else {
      await createCategory(form);
    }

    setShowModal(false);
    loadCategories();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete category"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="categories-page">
        <div className="categories-header">
          <h1>Categories</h1>
          <button className="btn-primary" onClick={openAdd}>
            + Add Category
          </button>
        </div>

        <div className="categories-table-card">
          <table className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-cell">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>
                      <span
                        className={`status ${
                          cat.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="icon-btn"
                        onClick={() => openEdit(cat)}
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => remove(cat._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="image-overlay">
            <div className="confirm-box">
              <h3>{editing ? "Edit Category" : "Add Category"}</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={submit}>
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Categories;
