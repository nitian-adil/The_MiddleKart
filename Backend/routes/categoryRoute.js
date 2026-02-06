import express from "express";
import {createCategory,getCategories} from '../controller/categoryController.js'
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createCategory);
router.get("/", getCategories);

export default router;
