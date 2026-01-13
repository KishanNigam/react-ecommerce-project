import api from "./api";

// Fetch products (optionally by category)
export const fetchProducts = async (category) => {
  const url = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  const res = await api.get(url);
  return res.data;
};
