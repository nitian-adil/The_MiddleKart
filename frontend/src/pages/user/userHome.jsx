import { ShoppingBag, ShoppingCart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
const UserHome = () => {
  const { cart } = useCart();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          👋 Welcome back
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your orders, cart and shopping from here
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard
          icon={<ShoppingBag size={28} />}
          title="Total Orders"
          value="0"
        />
        <StatCard
          icon={<ShoppingCart size={28} />}
          title="Cart Items"
          value={cart.length}
        />
        <StatCard
          icon={<Wallet size={28} />}
          title="Wallet"
          value="₹0"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            🛒 Shop Now
          </Link>

          <Link
            to="/cart"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            View Cart
          </Link>

          <Link
            to="/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            My Orders
          </Link>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">
          Recent Activity
        </h2>

        <p className="text-gray-500">
          No recent orders yet. Start shopping 🚀
        </p>
      </div>
    </div>
  );
};

/* SMALL REUSABLE CARD */
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">
        {title}
      </p>
      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  </div>
);

export default UserHome;
