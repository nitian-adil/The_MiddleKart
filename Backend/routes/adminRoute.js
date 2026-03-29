import express from "express";
import {
  getDashboardStats,
  getAllUsersWithPurchaseCount
} from "../controller/adminController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ FIXED ROUTES
router.get("/users", protect, isAdmin, getAllUsersWithPurchaseCount);
router.get("/dashboard", protect, isAdmin, getDashboardStats);

export default router;