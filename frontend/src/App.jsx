import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

// public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

// route guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

// user pages
import UserHome from "./pages/user/userHome";

// admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminProducts from "./pages/admin/AdminProduct";
import AddProduct from "./pages/admin/AddProduct";
import AdminSales from "./pages/admin/AdminSales";
import AdminUsers from "./pages/admin/AdminUsers";

const App = () => {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="home" element={<AdminHome />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="sales" element={<AdminSales />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= USER ROUTES ================= */}
          <Route
            path="/user/home"
            element={
              <UserRoute>
                <UserHome />
              </UserRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
  );
};

export default App;
