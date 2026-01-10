import React from "react";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Categories from "../pages/admin/Categories";

export const ADMIN_ROUTES = [
  {
    path: "/admin/dashboard",
    component: <AdminDashboard />,
    protected: true,
  },
  {
    path: "/admin/products",
    component: <Products />,
    protected: true,
  },
  {
    path: "/admin/add-product",
    component: <AddProduct />,
    protected: true,
  },
  {
    path: "/admin/products/:id/edit",
    component: <EditProduct />,
    protected: true,
  },
  {
    path: "/admin/categories",
    component: <Categories />,
    protected: true,
  },
  {
    path: "/admin/orders",
    component: <Orders />,
    protected: true,
  },
];
