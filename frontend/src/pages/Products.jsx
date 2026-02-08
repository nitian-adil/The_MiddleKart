import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productApi";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* ================= PRODUCTS GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-10 text-gray-800"
        >
          🛍️ Our Products
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition border overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 object-contain"
                />
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <h2 className="font-semibold text-sm line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-lg font-bold text-orange-500 mt-2">
                  ₹{product.price}
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                           rounded-full bg-white shadow-md hover:bg-orange-100
                           text-gray-600 hover:text-orange-600 transition"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row">
                {/* LEFT IMAGE */}
                <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="h-72 object-contain"
                  />
                </div>

                {/* RIGHT DETAILS */}
                <div className="md:w-1/2 p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProduct.title}
                  </h2>

                  <p className="text-3xl font-extrabold text-orange-500">
                    ₹{selectedProduct.price}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {selectedProduct.description}
                  </p>

                  {/* FEATURES */}
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ 100% Genuine Product</li>
                    <li>🚚 Free & Fast Delivery</li>
                    <li>🔒 Secure Payment</li>
                    <li>↩ Easy 7-day Return</li>
                  </ul>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        // navigate("/cart");
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Add to Cart
                    </button>


                  <button
  onClick={() => {
    addToCart(selectedProduct);
    navigate("/cart");
  }}
  className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-semibold transition"
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
    </>
  );
};

export default Products;
