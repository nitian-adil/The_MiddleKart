import express from "express";
import {getDashboardStats,getAllUsersWithPurchaseCount}  from "../controller/adminController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", isAdmin, getAllUsersWithPurchaseCount);
router.get("/dashboard", isAdmin, getDashboardStats);
export default router;
