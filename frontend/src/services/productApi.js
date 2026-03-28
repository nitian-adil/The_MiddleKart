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

export const updateProductQuantity = async (id, quantity) => {
  const { data } = await api.put(`/products/${id}/quantity`, {
    quantity
  });
  return data;
};
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  
  console.log("Deleted id:", id);
  console.log("Response:", res.data);

  return res.data;
};
