import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import "../../styles/orders.css";
import { FiSearch, FiEye } from "react-icons/fi";

function Orders() {
  return (
    <AdminLayout>
      <div className="orders-page">
        {/* PAGE HEADER */}
        <div className="orders-top">
          <h1>Orders</h1>
        </div>

        {/* FILTER BAR */}
        <div className="orders-filters">
          <div className="search-box">
            <FiSearch />
            <input placeholder="Search orders..." />
          </div>

          <select>
            <option>All Status</option>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="orders-table-card">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th align="right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#ORD-1001</td>
                <td>Rahul Sharma</td>
                <td>12 Aug 2026</td>
                <td>₹2,499</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
                <td align="right">
                  <button className="icon-btn">
                    <FiEye />
                  </button>
                </td>
              </tr>

              <tr>
                <td>#ORD-1002</td>
                <td>Anjali Verma</td>
                <td>13 Aug 2026</td>
                <td>₹1,299</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
                <td align="right">
                  <button className="icon-btn">
                    <FiEye />
                  </button>
                </td>
              </tr>

              <tr>
                <td>#ORD-1003</td>
                <td>Amit Singh</td>
                <td>14 Aug 2026</td>
                <td>₹3,999</td>
                <td>
                  <span className="status cancelled">Cancelled</span>
                </td>
                <td align="right">
                  <button className="icon-btn">
                    <FiEye />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Orders;
