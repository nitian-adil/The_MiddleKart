import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
