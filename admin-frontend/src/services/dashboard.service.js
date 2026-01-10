import api from "./api";

export const fetchDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};
