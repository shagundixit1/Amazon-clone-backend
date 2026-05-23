import express from "express";
import productRoutes from "../modules/products/product.routes.js";
import addressRoutes from "../modules/address/address.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";



const router = express.Router();

// connect product routes
router.use("/products", productRoutes);
router.use("/address", addressRoutes);
router.use("/orders", orderRoutes);
export default router;