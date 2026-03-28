import { useState } from "react";
import { addProduct } from "../../services/adminProductApi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const capitalizeFirstLetter = (value) =>
    value
      ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        category: capitalizeFirstLetter(form.category.trim()),
      });

      toast.success("✅ Product added successfully");

      setForm({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-white"
        >
          ➕ Add New Product
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-xl space-y-5"
        >

          {/* INPUT STYLE COMMON */}
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </motion.form>
      </div>
    </div>
  );
};

export default AddProduct;