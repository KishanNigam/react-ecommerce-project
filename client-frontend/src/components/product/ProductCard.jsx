import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/product.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const image =
    product.images && product.images.length > 0
      ? `http://localhost:5000${product.images[0]}`
      : null;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* IMAGE */}
      <div className="product-card-img">
        {image ? (
          <img src={image} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      {/* INFO */}
      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">₹{product.price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
