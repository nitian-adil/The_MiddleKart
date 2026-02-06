import express from "express";
import {createProduct,getProducts} from '../controller/productController.js'
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createProduct);
router.get("/", getProducts);

export default router;
