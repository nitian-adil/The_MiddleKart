import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

      if (data.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542838132-92c53300491e)",
      }}
    >
      {/* 🌿 Green overlay */}
      <div className="absolute inset-0 bg-green-900/60"></div>

      {/* 🌱 Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-96 backdrop-blur-md bg-white/90 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          🥕 MiddleKart Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border border-green-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border border-green-300 p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-semibold">
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Fresh vegetables • Fast delivery 🌿
        </p>
      </form>
    </div>
  );
};

export default Login;
