import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/product.service";
import { fetchCategories } from "../../services/category.service";
import ProductCard from "../../components/product/ProductCard";

function CategoryProducts() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchCategories().then((cats) => {
      const match = (cats || []).find(
        (c) => c.slug === slug && c.status === "Active"
      );

      if (!match) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setCategoryName(match.name);

      fetchProducts(match.name).then((data) => {
        if (!active) return;
        setProducts(data.products || []);
        setLoading(false);
      });
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="category-products-page">
      <h1>{categoryName}</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
