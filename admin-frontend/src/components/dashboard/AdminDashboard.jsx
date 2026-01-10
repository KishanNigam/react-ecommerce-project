import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import OrdersBarChart from "../../components/dashboard/OrdersBarChart";
import OrderStatusChart from "../../components/dashboard/OrderStatusChart";
import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../services/dashboard.service";

import "../../styles/dashboard.css";

const [stats, setStats] = useState(null);

useEffect(() => {
  fetchDashboardStats().then(setStats);
}, []);

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>

        {/* ===== TOP STATS CARDS ===== */}
        <div className="stats-grid">
          <StatCard title="Total Customers" value="20,000" trend="+4,000" />
          <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
          <StatCard title="Active Customers" value="5,000" trend="+200" />
          <StatCard title="Total Revenue" value="₹42,000" trend="+₹20,000" />
          <StatCard title="Total Refunds" value="₹30,000" trend="+₹5,000" />
        </div>

        {/* ===== CHARTS SECTION (THIS WAS MISSING) ===== */}
        <div className="dashboard-charts">
          <div className="chart-box large">
            <SalesChart />
          </div>

          <div className="chart-box">
            <OrdersBarChart />
          </div>

          <div className="chart-box">
            <OrderStatusChart />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
