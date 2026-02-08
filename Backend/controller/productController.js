import Product from "../models/ProductModel.js";

// Create product (Admin)

// ✅ ADD PRODUCT (ADMIN)
export const addProduct = async (req, res) => {
  try {
    const { title, price, image, description, category } = req.body;

    if (!title || !price || !image) {
      return res.status(400).json({
        message: "Title, price and image are required",
      });
    }

    const product = await Product.create({
      title,
      price,
      image,
      description,
      category,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get all products (Public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
