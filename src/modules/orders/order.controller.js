import * as service from "./order.repository.js";


// 🔐 PLACE ORDER (PROTECTED)
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId, items } = req.body;

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await service.createOrder({
      userId,
      addressId,
      items,
    });

    res.status(201).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// 📦 GET USER ORDERS (NEW)
export const getUserOrders = async (req, res) => {
  try {
    console.log("USER FROM TOKEN:", req.user);

    const userId = req.user.id || req.user.userId;

    console.log("USER ID USED:", userId);

    const orders = await service.getUserOrdersRepo(userId);

    console.log("ORDERS FOUND:", orders);

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// 📦 GET ORDER DETAILS (NEW)
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await service.getOrderByIdRepo(id, userId);

    res.json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};