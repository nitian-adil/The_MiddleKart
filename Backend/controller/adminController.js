import User from "../models/UserModel.js";
import Order from "../models/OrderModel.js";

export const getAllUsersWithPurchaseCount = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email");

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });

        let totalProductsPurchased = 0;

        orders.forEach(order => {
          order.items.forEach(item => {
            totalProductsPurchased += item.qty;
          });
        });

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
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    console.log(totalUsers)
    
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

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