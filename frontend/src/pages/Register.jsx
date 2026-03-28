import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      toast.error("Registration Failed ❌");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8')",
      }}
    >
      {/* 🌙 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md backdrop-blur-lg 
                   bg-white/90 dark:bg-gray-900/90 
                   text-black dark:text-white 
                   p-8 rounded-2xl shadow-2xl space-y-5 transition"
      >
        <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400">
          Create Account
        </h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border 
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-black dark:text-white
                     rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-red-400"
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border 
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-black dark:text-white
                     rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-red-400"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border 
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-black dark:text-white
                     rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-red-400"
        />

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border 
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-black dark:text-white
                     rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-red-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 
                     text-white py-2 rounded-lg font-semibold transition"
        >
          Register
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            className="text-red-600 dark:text-red-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;