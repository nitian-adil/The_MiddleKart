import api from "./api";
import axios from "axios";

export const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addToCart = async (productId) => {
  const res = await api.post("/cart/add", { productId });
  return res.data;
};
