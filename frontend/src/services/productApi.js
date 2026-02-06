import api from "./api";
import axios from "axios";

const EXTERNAL_API = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
  const response = await axios.get(EXTERNAL_API);
  return response.data;
};

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addToCart = async (productId) => {
  const res = await api.post("/cart/add", { productId });
  return res.data;
};
