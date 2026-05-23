


import express from "express";
import { createProduct, getProducts, getProductById, getMyProducts } from "./product.controller.js";
import { protect } from "../../middleware/auth.js"; // ✅ NEW

const router = express.Router();

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔐 PROTECTED
router.post("/", protect, createProduct);
router.get("/my", protect, getMyProducts);

export default router;