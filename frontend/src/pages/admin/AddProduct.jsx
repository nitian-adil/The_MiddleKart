import { useState } from "react";
import { addProduct } from "../../services/adminProductApi";
import { motion } from "framer-motion";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct({
        ...form,
        price: Number(form.price),
      });

      alert("✅ Product added successfully");

      setForm({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-8 text-gray-800"
      >
        ➕ Add New Product
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl space-y-5"
      >
        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />

        {/* IMAGE */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />

        {/* CATEGORY */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400"
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
  );
};

export default AddProduct;
