import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminHome";
import UserRoute from "./components/UserRoute";
import UserHome from "./pages/user/userHome";
import AdminHome from './pages/admin/AdminHome'
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AddProduct";
import AdminSales from "./pages/admin/AdminSales";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLayout from "./pages/admin/AdminLayout";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />


 <Routes>
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route index element={<AdminHome />} /> {/* default */}
    <Route path="home" element={<AdminHome />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="sales" element={<AdminSales />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/cart" element={<Cart/>} />
<Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>
  <Route
    path="/user/home"
    element={
      <UserRoute>
        <UserHome />
      </UserRoute>
    }
  />

  <Route
    path="/admin/home"
    element={
      <AdminRoute>
        <AdminHome />
      </AdminRoute>
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
