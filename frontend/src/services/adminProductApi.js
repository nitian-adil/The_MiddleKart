import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend base url
  withCredentials: true, // if you use cookies / jwt
});

// 🔹 ADD PRODUCT
export const addProduct = async (productData) => {

  const response = await API.post("/products/addproducts", productData);
  console.log("response ",response)
  return response.data;
};

// 🔹 GET ALL PRODUCTS (Admin)
export const getAllProductsAdmin = async () => {
  const response = await API.get("/products");
  return response.data;
};

// 🔹 DELETE PRODUCT
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

// 🔹 UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};
