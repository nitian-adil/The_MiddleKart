import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          Middle<span className="text-orange-500">Kart</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link className="text-gray-600 hover:text-black" to="/">
            Home
          </Link>
          <Link className="text-gray-600 hover:text-black" to="/login">
            Login
          </Link>
          <Link
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            to="/register"
          >
            Sign Up
          </Link>
          <Link className="text-gray-600 hover:text-black" to="/products">
  Products
</Link>

          <Link to="/cart" className="relative text-xl">
            🛒
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-1.5 rounded-full">
              0
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
