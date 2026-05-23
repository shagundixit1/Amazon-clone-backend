import prisma from "../../config/prisma.js";

export const createOrder = async (data) => {
  const { userId, addressId, items } = data;

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  const productMap = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });

  let totalAmount = 0;

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = productMap[item.productId];

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const quantity = item.quantity || 1;

      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.title}`);
      }

      const price = Number(product.price);

      totalAmount += price * quantity;

      await prisma.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });

      return {
        productId: product.id,
        quantity,
        priceAtPurchase: price,
      };
    })
  );

  return prisma.order.create({
    data: {
      userId,
      addressId,
      totalAmount,
      orderItems: {
        create: orderItems,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
};


// 🔥 FIXED GET USER ORDERS
export const getUserOrdersRepo = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: true, // 🔥 REQUIRED
        },
      },
    },
    orderBy: {
      placedAt: "desc",
    },
  });
};


// 🔥 FIXED GET ORDER BY ID
export const getOrderByIdRepo = async (id, userId) => {
  return prisma.order.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
};