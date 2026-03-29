  import User from "../models/UserModel.js";
  import Order from "../models/OrderModel.js";
  import Product from "../models/ProductModel.js";

  // ✅ GET USERS WITH STATS
  export const getAllUsersWithPurchaseCount = async (req, res) => {
    try {
      // 🔍 Step 1: Get users
const users = await User.find({  role: { $regex: /^user$/i } }).select("name email");
      console.log("Users found:", users.length); // DEBUG

      const usersWithStats = await Promise.all(
        users.map(async (user) => {

          // 🔍 Step 2: Get orders of user
          const orders = await Order.find({ user: user._id });


          // 🔍 Step 3: Calculate products purchased
          const totalProductsPurchased = orders.reduce((total, order) => {
            return total + order.items.reduce((sum, item) => {
              return sum + (item.quantity || 0);
            }, 0);
          }, 0);

          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            ordersCount: orders.length,
            productsPurchased: totalProductsPurchased,
          };
        })
      );

     

      res.json(usersWithStats);
    } catch (error) {
      console.error("ERROR:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };


  // ✅ DASHBOARD STATS
  export const getDashboardStats = async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const totalUsers = await User.countDocuments({ role: "user" });

      const orders = await Order.find();

      const totalSales = orders.reduce((sum, order) => {
        return sum + (order.totalAmount || 0);
      }, 0);

      res.json({
        totalProducts,
        totalUsers,
        totalSales
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  };