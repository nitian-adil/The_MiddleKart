import express from "express";
import { placeOrder, myOrders } from "../controller/orderController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAdmin, placeOrder);
router.get("/my", isAdmin, myOrders);

export default router;
