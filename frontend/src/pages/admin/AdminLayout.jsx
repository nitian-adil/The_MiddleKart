import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-2xl font-bold text-orange-500">
          Admin Panel
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <NavLink to="/admin/home" className="admin-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className="admin-link">
            Products
          </NavLink>
          <NavLink to="/admin/sales" className="admin-link">
            Sales
          </NavLink>
          <NavLink to="/admin/users" className="admin-link">
            Users
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <Outlet /> {/* 👈 THIS IS KEY */}
      </main>
    </div>
  );
};

export default AdminLayout;
