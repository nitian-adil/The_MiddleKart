import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleBuyNow = () => {
    navigate("/payment", {
      state: { cart, total },
    });
  };

  // 🛒 EMPTY STATE
  if (!cart.length) {
    return (
      <div className="bg-white dark:bg-gray-950 min-h-screen flex items-center justify-center text-black dark:text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">🛒 Your Cart is Empty</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white transition">

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Your Cart
        </h1>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow hover:shadow-md transition"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="h-20 object-contain"
              />

              {/* DETAILS */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-orange-500 font-bold mt-1">
                  ₹{item.price}
                </p>
              </div>

              {/* QUANTITY */}
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  updateQty(item._id, Number(e.target.value))
                }
                className="w-16 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 rounded text-center"
              />

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>

            </div>
          ))}
        </div>

        {/* TOTAL + BUTTON */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-2xl font-bold">
            Total: <span className="text-orange-500">₹{total}</span>
          </p>

          <button
            onClick={handleBuyNow}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Proceed to Buy
          </button>

        </div>
      </div>
    </div>
  );
};

export default Cart;