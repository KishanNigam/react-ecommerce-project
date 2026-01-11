import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className="category-card"
      onClick={() => navigate(`/category/${category.slug}`)}
    >
      <div className="category-img">
        {/* placeholder image */}
        <span>📦</span>
      </div>
      <h3>{category.name}</h3>
    </div>
  );
}

export default CategoryCard;
