
import api from "./api";  // ✅ REQUIRED
export const getAllUsers = async () => {
  const token = localStorage.getItem("token"); // 🔥 get token

  const res = await api.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
  });

  return res.data;
};