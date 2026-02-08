import api from "./api"; // your axios instance

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};
