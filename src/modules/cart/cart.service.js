import {
  findCartByUserId,
  createCart,
  findCartItem,
  createCartItem,
  updateCartItemRepo,
  deleteCartItem,
} from "./cart.repository.js";

const getOrCreateCart = async (userId) => {
  let cart = await findCartByUserId(userId);

  if (!cart) {
    await createCart(userId);
    cart = await findCartByUserId(userId);
  }

  return cart;
};

export const addToCartService = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);

  const existing = await findCartItem(cart.id, productId);

  if (existing) {
    await updateCartItemRepo(existing.id, existing.quantity + 1);
  } else {
    await createCartItem(cart.id, productId);
  }

  return getOrCreateCart(userId);
};

export const getCartService = async (userId) => {
  return getOrCreateCart(userId);
};

export const updateCartItemService = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId);

  const item = await findCartItem(cart.id, productId);
  if (!item) throw new Error("Item not found");

  await updateCartItemRepo(item.id, quantity);

  return getOrCreateCart(userId);
};

export const removeCartItemService = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);
  await deleteCartItem(cart.id, productId);
};