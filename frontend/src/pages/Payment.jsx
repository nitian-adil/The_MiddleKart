import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);

  const cart = state?.cart || [];
  const total = state?.total || 0;

  useEffect(() => {
    if (!cart.length) {
      navigate("/cart");
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = () => {
    clearCart();
    navigate("/orders", {
      state: { success: true },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-black dark:text-white transition">

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-96 text-center border border-gray-200 dark:border-gray-700">

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Payment
        </h2>

        {loading ? (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Processing payment...
            </p>

            <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Amount to Pay: ₹{total}
            </p>

            <button
              onClick={handleSuccess}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Pay Now (Mock)
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;