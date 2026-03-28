import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
  type: Number,
  default: 0
},
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
