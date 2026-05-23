import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "./order.controller.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// 🔐 PLACE ORDER
router.post("/", protect, createOrder);

// 📦 GET ALL USER ORDERS
router.get("/", protect, getUserOrders);

// 📦 GET ORDER BY ID
router.get("/:id", protect, getOrderById);

export default router;