import { useEffect, useState } from "react";
import { fetchProducts,getProducts } from "../../services/productApi";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
        const data = await fetchProducts();
      try {
        const data = await getProducts(); // admin products
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id || product.id} className="border-t">
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

                <td className="px-4 py-3 text-orange-600 font-semibold">
                  ₹{product.price}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
