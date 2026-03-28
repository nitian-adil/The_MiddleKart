import { NavLink, Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white transition">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg">

        <div className="p-6 text-2xl font-bold text-orange-500">
          Admin Panel
        </div>

        <nav className="flex flex-col gap-2 px-4">

          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <Link
            to="/admin/addproduct"
            className="px-4 py-2 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            ➕ Add Product
          </Link>

          <NavLink
            to="/admin/sales"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            Sales
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            Users
          </NavLink>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-950 transition">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;