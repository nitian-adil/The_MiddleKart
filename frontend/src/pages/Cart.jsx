import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, removeFromCart } from "../services/cartApi";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCart(data.items);
    };
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(cart.filter((i) => i.product._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.length > 0 && (
  <Link
    to="/checkout"
    className="inline-block mt-6 bg-black text-white px-6 py-2 rounded"
  >
    Proceed to Checkout
  </Link>
)}

      {cart.map((item) => (
        <div
          key={item.product._id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">
              ₹{item.product.price} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => handleRemove(item.product._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
