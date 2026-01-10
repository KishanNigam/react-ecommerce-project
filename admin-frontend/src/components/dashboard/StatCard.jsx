import React from "react";

function StatCard({ title, value, trend }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <p>{trend} last 30 days</p>
    </div>
  );
}

export default StatCard;
