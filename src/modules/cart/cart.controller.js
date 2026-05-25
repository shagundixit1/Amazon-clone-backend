import prisma from "../../config/prisma.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }

    res.json({ msg: "Item added to cart" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.json({ cartItems: [] });
    }

    res.json({ cartItems: cart.cartItems });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    res.json({ msg: "Cart updated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating cart" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await prisma.cartItem.delete({
      where: { id: item.id },
    });

    res.json({ msg: "Item removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error removing item" });
  }
};