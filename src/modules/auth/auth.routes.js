import express from "express";
import { checkUser, register, login, getMe } from "./auth.controller.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// 🔍 CHECK USER
router.post("/check-user", checkUser);

// 📝 REGISTER
router.post("/register", register);

// 🔐 LOGIN
router.post("/login", login);

// 🔐 GET CURRENT USER (NEW)
router.get("/me", protect, getMe);

export default router;