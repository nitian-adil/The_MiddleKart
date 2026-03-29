import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      login(data);
  localStorage.setItem("token", data.token);
      if (data.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative text-black dark:text-white"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542838132-92c53300491e)",
      }}
    >
      {/* 🌿 Overlay */}
      <div className="absolute inset-0 bg-green-900/60 dark:bg-black/70"></div>

      {/* 🌱 Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-96 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center mb-6">
          🥕 MiddleKart Login
        </h2>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        {/* BUTTON */}
        <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold">
          Login
        </button>

        {/* FOOTER TEXT */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-400 mt-4">
          Fresh vegetables • Fast delivery 🌿
        </p>
      </form>
    </div>
  );
};

export default Login;