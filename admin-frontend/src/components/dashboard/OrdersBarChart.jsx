import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function OrdersBarChart({ data }) {
  return (
    <>
      <h3>Orders Per Day</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Bar dataKey="orders" fill="#60a5fa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default OrdersBarChart;
