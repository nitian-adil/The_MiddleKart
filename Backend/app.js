import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import categoryRoutes from './routes/categoryRoute.js'
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import productRoutes from './routes/productRoute.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);



app.get("/", (req, res) => {
  res.send("MiddleKart API running 🚀");
});

export default app;
