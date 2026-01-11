import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../services/category.service";
import CategoryCard from "../../components/product/CategoryCard";
import "../../styles/home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        // show only Active categories
        const active = (data || []).filter(
          (c) => c.status === "Active"
        );
        setCategories(active);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="home-page">
      <h1>Shop by Category</h1>

      <div className="category-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
}

export default Home;
