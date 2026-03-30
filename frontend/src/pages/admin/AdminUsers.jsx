import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminUserApi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
      const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-black dark:text-white">
        <p className="text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
                    {t("users")}

      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow overflow-x-auto"
      >

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4">{t("name")}</th>
              <th className="p-4">{t("email")}</th>
              <th className="p-4 text-center">Orders</th>
              <th className="p-4 text-center">Products Purchased</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-4 text-gray-800 dark:text-white">
                  {user.name}
                </td>

                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {user.email}
                </td>

                <td className="p-4 text-center font-semibold">
                  {user.ordersCount}
                </td>

                <td className="p-4 text-center font-semibold text-orange-500">
                  {user.productsPurchased}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400">
            No users found
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUsers;