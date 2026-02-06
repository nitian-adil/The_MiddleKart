import api from "./api";

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await api.post("/cart/remove", { productId });
  return res.data;
};
