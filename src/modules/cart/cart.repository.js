import prisma from "../../config/prisma.js";

export const findCartByUserId = async (userId) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });
};

export const createCart = async (userId) => {
  return prisma.cart.create({ data: { userId } });
};

export const findCartItem = async (cartId, productId) => {
  return prisma.cartItem.findFirst({
    where: { cartId, productId },
  });
};

export const createCartItem = async (cartId, productId) => {
  return prisma.cartItem.create({
    data: { cartId, productId, quantity: 1 },
  });
};

export const updateCartItemRepo = async (id, quantity) => {
  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

export const deleteCartItem = async (cartId, productId) => {
  return prisma.cartItem.deleteMany({
    where: { cartId, productId },
  });
};