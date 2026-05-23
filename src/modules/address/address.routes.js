import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "./address.controller.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// 📍 GET ALL USER ADDRESSES
router.get("/", protect, getAddresses);

// ➕ ADD ADDRESS
router.post("/", protect, addAddress);

// ✏️ UPDATE ADDRESS
router.put("/:id", protect, updateAddress);

// ❌ DELETE ADDRESS
router.delete("/:id", protect, deleteAddress);

export default router;