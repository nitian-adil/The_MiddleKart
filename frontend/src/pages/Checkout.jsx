import { placeOrder } from "../services/orderApi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      await placeOrder();
      alert("Order placed successfully");
      navigate("/orders");
    } catch {
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <button
        onClick={handleOrder}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Place Order (COD)
      </button>
    </div>
  );
};

export default Checkout;
