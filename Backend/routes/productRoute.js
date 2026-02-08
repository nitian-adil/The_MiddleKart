import express from "express";
import {addProduct,getProducts} from '../controller/productController.js'
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", protect, isAdmin, createProduct);
router.get("/", getProducts);
router.post("/addproducts", addProduct);

export default router;
