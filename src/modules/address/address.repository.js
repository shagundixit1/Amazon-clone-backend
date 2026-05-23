import prisma from "../../config/prisma.js";

// ✅ CREATE ADDRESS
export const createAddressRepo = async (userId, data) => {
  return prisma.address.create({
    data: {
      ...data,
      userId,
    },
  });
};

// ✅ GET USER ADDRESSES
export const getUserAddressesRepo = async (userId) => {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// 🔐 UPDATE ADDRESS (only owner can update)
export const updateAddressRepo = async (addressId, userId, data) => {
  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!address) {
    throw new Error("Address not found");
  }

  if (address.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.address.update({
    where: { id: addressId },
    data,
  });
};

// 🔐 DELETE ADDRESS (only owner can delete)
export const deleteAddressRepo = async (addressId, userId) => {
  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!address) {
    throw new Error("Address not found");
  }

  if (address.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.address.delete({
    where: { id: addressId },
  });
};


// 📦 GET USER ORDERS
export const getUserOrdersRepo = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: true, // 🔥 important for frontend
        },
      },
      address: true,
    },
    orderBy: { placedAt: "desc" },
  });
};


// 📦 GET SINGLE ORDER
export const getOrderByIdRepo = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔐 SECURITY
  if (order.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return order;
};