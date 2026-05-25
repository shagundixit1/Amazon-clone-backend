




import prisma from "../../config/prisma.js";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany({
      include: { category: true },
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    return [];
  }
};


//  GET PRODUCT BY ID
export const getProductByIdRepo = async (id) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
    },
  });
};


//  UPDATE PRODUCT (ONLY OWNER)
export const updateProductRepo = async (id, userId, data) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.userId !== userId) {
    throw new Error("Not authorized to update this product");
  }

  return await prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
    },
  });
};


//  DELETE PRODUCT (ONLY OWNER)
export const deleteProductRepo = async (id, userId) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.userId !== userId) {
    throw new Error("Not authorized to delete this product");
  }

  return await prisma.product.delete({
    where: { id },
  });
};