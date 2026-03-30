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

export const updateProduct =async (req,res)=>{
  try {
    const { quantity } = req.body;
    console.log("quantity" , quantity)

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity" });
  }
}

// ✅ DELETE PRODUCT (ADMIN)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const autoRecommendation=async(req,res)=>{
  const product = await Product.findById(req.params.id);

  const recommendations = await Product.find({
    category: product.category,
    _id: { $ne: product._id }, // exclude current product
  }).limit(6);

  res.json(recommendations);
}