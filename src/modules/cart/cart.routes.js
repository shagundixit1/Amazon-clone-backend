import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "./cart.controller.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/", protect, updateCartItem);
router.delete("/:productId", protect, removeCartItem);

export default router;