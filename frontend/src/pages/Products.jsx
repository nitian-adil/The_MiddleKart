import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productApi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
      const { t, i18n } = useTranslation();
  
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 🔥 Recommendation API
  useEffect(() => {
    if (!selectedProduct) {
      setRecommendations([]);
      return;
    }

    fetch(`/api/products/${selectedProduct._id}/recommendations`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error("Recommendation error", err));
  }, [selectedProduct]);

  // 🔥 Load products
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-8">

          {/* SIDEBAR */}
          <aside className="w-64 hidden md:block">
            <div className="bg-white dark:bg-gray-900 border rounded-2xl shadow p-5 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Categories</h2>

              <ul className="space-y-2">
                {categories.map(category => (
                  <li
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer px-4 py-2 rounded-lg ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-800"
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
            <h1 className="text-4xl font-bold mb-10">🛍️ Our Products</h1>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">No products found 😔</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer border rounded-2xl shadow hover:shadow-xl p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 mx-auto object-contain"
                    />
                    <h2 className="mt-2 text-sm line-clamp-2">
                      {product.title}
                    </h2>
                    <p className="text-orange-500 font-bold">
                      ₹{product.price}
                    </p>
                  </div>
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
            className="fixed inset-0 bg-black/60 flex justify-center items-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full p-6"
            >

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-6">

                {/* IMAGE */}
                <div className="md:w-1/2">
                  <img
                    src={selectedProduct.image}
                    className="h-72 mx-auto object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="md:w-1/2 space-y-4">

                  <h2 className="text-2xl font-bold">
                    {selectedProduct.title}
                  </h2>

                  <p className="text-3xl text-orange-500 font-bold">
                    ₹{selectedProduct.price}
                  </p>

                  <p className="text-sm">
                    {selectedProduct.description}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-orange-500 text-white py-2 rounded"
                    >
                            {t("addToCart")}

                    </button>

                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        navigate("/cart");
                      }}
                      className="flex-1 border border-orange-500 text-orange-500 py-2 rounded"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* 🔥 RECOMMENDATIONS */}
                  {recommendations.length > 0 && (
                    <div className="pt-6">
                      <h3 className="font-bold mb-3">
                        🔥 Similar Products
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {recommendations.map(item => (
                          <div
                            key={item._id}
                            onClick={() => setSelectedProduct(item)}
                            className="cursor-pointer border p-2 rounded hover:shadow"
                          >
                            <img
                              src={item.image}
                              className="h-16 mx-auto object-contain"
                            />
                            <p className="text-xs line-clamp-2">
                              {item.title}
                            </p>
                            <p className="text-orange-500 text-sm">
                              ₹{item.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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