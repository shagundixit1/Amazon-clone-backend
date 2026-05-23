import prisma from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔍 CHECK USER (EMAIL OR PHONE EXISTS)
export const checkUser = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ msg: "Identifier is required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    res.json({ exists: !!user });
  } catch (error) {
    console.error("CHECK USER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


// 📝 REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, identifier, password } = req.body;

    // ✅ basic validation
    if (!identifier || !password || !name) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    // 🔥 map identifier
    const email = identifier.includes("@") ? identifier : null;

    // ❌ we are NOT supporting phone right now
    if (!email) {
      return res.status(400).json({
        msg: "Please use a valid email",
      });
    }

    // 🔍 check existing (SAFE VERSION)
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📝 create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
  
};

// 🔐 LOGIN USER
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        msg: "Identifier and password are required",
      });
    }

    // 🔍 find by email OR phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // 🔑 generate token
    const token = jwt.sign(
      { id: user.id },
      "secret", // move to .env later
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};





// when anyhow if the credential get removed from the backend then page should refresh and again login are required 
// 🔥 GET CURRENT USER (NEW)
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // ❌ USER DOES NOT EXIST (deleted from DB)
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("GET ME ERROR:", error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};