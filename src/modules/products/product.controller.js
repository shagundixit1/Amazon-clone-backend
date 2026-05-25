import prisma from "../../config/prisma.js";
import { createProductService } from "./product.service.js";
import {
  getAllProducts,
  getProductByIdRepo,
  updateProductRepo,
  deleteProductRepo,
} from "./product.repository.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const userId = req.user.id;

    const product = await createProductService({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  FIXED EXPORT NAME
export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET MY PRODUCTS
export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await prisma.product.findMany({
      where: { userId },
      include: { category: true },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("GET MY PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdRepo(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updatedProduct = await updateProductRepo(id, userId, req.body);

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteProductRepo(id, userId);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};