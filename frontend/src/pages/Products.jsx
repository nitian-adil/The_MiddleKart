import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productApi";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  // 🔄 LOADER
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white transition">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex gap-8">

          {/* SIDEBAR */}
          <aside className="w-64 hidden md:block shrink-0">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-5 sticky top-24">

              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Categories
              </h2>

              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition
                      ${
                        selectedCategory === category
                          ? "bg-orange-500 text-white shadow"
                          : "text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* PRODUCTS */}
          <section className="flex-1">

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold mb-10 text-gray-800 dark:text-white"
            >
              🛍️ Our Products
            </motion.h1>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                No products found 😔
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                  >

                    {/* IMAGE */}
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-32 object-contain"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="p-4">
                      <h2 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-white">
                        {product.title}
                      </h2>

                      <p className="text-lg font-bold text-orange-500 mt-2">
                        ₹{product.price}
                      </p>

                      {product.quantity <= 3 && (
                        <p className="text-sm font-semibold text-red-500 mt-1">
                          {product.quantity === 0
                            ? "Out of stock"
                            : `Only ${product.quantity} left`}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-900 text-black dark:text-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden"
            >

              {/* CLOSE */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-orange-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row">

                {/* IMAGE */}
                <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="h-72 object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="md:w-1/2 p-6 space-y-4">

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedProduct.title}
                  </h2>

                  <p className="text-3xl font-extrabold text-orange-500">
                    ₹{selectedProduct.price}
                  </p>

                  {selectedProduct.quantity <= 3 && (
                    <p className="text-red-500 font-semibold">
                      {selectedProduct.quantity === 0
                        ? "Out of stock"
                        : `Only ${selectedProduct.quantity} left`}
                    </p>
                  )}

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {selectedProduct.description}
                  </p>

                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>✅ 100% Genuine Product</li>
                    <li>🚚 Free & Fast Delivery</li>
                    <li>🔒 Secure Payment</li>
                    <li>↩ Easy 7-day Return</li>
                  </ul>

                  <div className="flex gap-4 pt-4">

                    <button
                      disabled={selectedProduct.quantity === 0}
                      onClick={() => addToCart(selectedProduct)}
                      className={`flex-1 py-3 rounded-xl font-semibold transition
                        ${
                          selectedProduct.quantity === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                    >
                      Add to Cart
                    </button>

                    <button
                      disabled={selectedProduct.quantity === 0}
                      onClick={() => {
                        addToCart(selectedProduct);
                        navigate("/cart");
                      }}
                      className={`flex-1 py-3 rounded-xl font-semibold transition
                        ${
                          selectedProduct.quantity === 0
                            ? "border border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      Buy Now
                    </button>

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Products;