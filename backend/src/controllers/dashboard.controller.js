const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const User = require("../models/User.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    const orderStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const monthlySales = await Order.aggregate([
      {
        $match: { status: "Delivered" },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formattedMonthlySales = monthlySales.map((m) => ({
      month: monthNames[m._id],
      sales: m.sales,
    }));

    const ordersPerDayAgg = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const ordersPerDay = ordersPerDayAgg.map((d) => ({
      day: days[d._id - 1],
      orders: d.orders,
    }));

    res.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      revenue,
      orderStatus,
      monthlySales: formattedMonthlySales,
      ordersPerDay,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
