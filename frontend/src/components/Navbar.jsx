import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();

  const [theme, setTheme] = useState("light");

  // ✅ Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  // ✅ Toggle theme properly
  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (loading) return null;

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 transition">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to={isAdmin ? "/admin/home" : "/"}
          className="text-2xl font-bold text-black dark:text-white"
        >
          Middle<span className="text-orange-500">Kart</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6">

          <Link
            to={isAdmin ? "/admin/home" : "/"}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to={isAdmin ? "/admin/products" : "/products"}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Products
          </Link>

          {/* 🌙 DARK MODE BUTTON */}
       <button
  onClick={toggleTheme}
  className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-black dark:text-white transition"
>
  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
</button>
          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>

              {!isAdmin && (
                <Link to="/cart" className="relative text-xl">
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;