import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-xl">
        🛒 Cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id} // ✅ FIX
          className="flex items-center gap-6 bg-white p-4 rounded-xl shadow mb-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-20 object-contain"
          />

          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-orange-500 font-bold">
              ₹{item.price}
            </p>
          </div>

          {/* QTY */}
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQty(item._id, Number(e.target.value)) // ✅ FIX
            }
            className="w-16 border rounded px-2"
          />

          {/* DELETE */}
          <button
            onClick={() => removeFromCart(item._id)} // ✅ FIX
            className="text-red-500 font-semibold"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">
          Total: ₹{total}
        </p>

        <button className="mt-4 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
