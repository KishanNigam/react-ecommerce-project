import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import OrdersBarChart from "../../components/dashboard/OrdersBarChart";
import OrderStatusChart from "../../components/dashboard/OrderStatusChart";
import { fetchDashboardStats } from "../../services/dashboard.service";
import "../../styles/dashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats().then(setStats);
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <StatCard title="Total Customers" value={stats?.totalCustomers || 0} />
          <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
          <StatCard title="Total Products" value={stats?.totalProducts || 0} />
          <StatCard title="Total Revenue" value={`₹${stats?.revenue || 0}`} />
        </div>

        <div className="dashboard-charts">
          <div className="chart-box large">
            <SalesChart data={stats?.monthlySales || []} />
          </div>

          <div className="chart-box">
            <OrdersBarChart data={stats?.ordersPerDay || []} />
          </div>

          <div className="chart-box">
            <OrderStatusChart data={stats?.orderStatus || []} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
