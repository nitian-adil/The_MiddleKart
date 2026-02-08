import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();

  if (loading) return null; // 🔥 prevent flicker

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();               // ✅ single source of truth
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to={isAdmin ? "/admin/home" : "/"}
          className="text-2xl font-bold text-black"
        >
          Middle<span className="text-orange-500">Kart</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6">

          <Link
            className="text-gray-600 hover:text-black"
            to={isAdmin ? "/admin/home" : "/"}
          >
            Home
          </Link>

          <Link
            className="text-gray-600 hover:text-black"
            to={isAdmin ? "/admin/products" : "/products"}
          >
            Products
          </Link>

          {!user && (
            <>
              <Link to="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-md"
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
