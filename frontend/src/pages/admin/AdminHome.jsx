import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminDashboardApi";
import { useTranslation } from "react-i18next";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ff7e5f", "#6a11cb", "#2575fc"];

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading dashboard...
      </p>
    );

  // 📊 Bar Chart Data
  const barData = [
    { name: "Products", value: stats.totalProducts },
    { name: "Users", value: stats.totalUsers },
    { name: "Sales", value: stats.totalSales },
  ];

  // 🥧 Pie Chart Data
  const pieData = [
    { name: "Products", value: stats.totalProducts },
    { name: "Users", value: stats.totalUsers },
    { name: "Sales", value: stats.totalSales },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {t("admindashboard")}
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold text-orange-500">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-3xl font-bold text-green-500">
            ₹{stats.totalSales}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-3xl font-bold text-blue-500">
            {stats.totalUsers}
          </p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 📊 BAR CHART */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
            Overview (Bar Chart)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🥧 PIE CHART */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
            Distribution (Pie Chart)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;