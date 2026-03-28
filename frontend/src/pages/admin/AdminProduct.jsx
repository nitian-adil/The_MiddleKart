import { useEffect, useState } from "react";
import { getProducts, updateProductQuantity, deleteProduct } from "../../services/productApi";
import toast from "react-hot-toast";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: value } : p
      )
    );
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await updateProductQuantity(id, Number(quantity));
      toast.success("Quantity updated successfully ✅");
      loadProducts();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product Deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-black dark:text-white">
        Loading products...
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-lg">

        <table className="min-w-full text-sm text-left">

          {/* HEADER */}
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >

                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-12 object-contain"
                  />
                </td>

                <td className="px-4 py-3 font-medium">
                  {product.title}
                </td>

                <td className="px-4 py-3 text-orange-500 font-semibold">
                  ₹{product.price}
                </td>

                {/* STOCK */}
                <td className="px-4 py-3">
                  {product.quantity <= 3 ? (
                    <span className="text-red-500 font-semibold">
                      Only {product.quantity} left
                    </span>
                  ) : (
                    <span className="text-green-500 font-medium">
                      In stock ({product.quantity})
                    </span>
                  )}
                </td>

                {/* UPDATE */}
                <td className="px-4 py-3 flex gap-2">

                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                    className="w-20 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-2 py-1"
                  />

                  <button
                    onClick={() =>
                      handleUpdateQuantity(product._id, product.quantity)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;