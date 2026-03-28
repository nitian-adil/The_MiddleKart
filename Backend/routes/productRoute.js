import express from "express";
import {addProduct,deleteProduct,getProducts, updateProduct} from '../controller/productController.js'
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", protect, isAdmin, createProduct);
router.get("/", getProducts);
router.post("/addproducts", addProduct);
router.put("/:id/quantity", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
