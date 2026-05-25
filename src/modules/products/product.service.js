import prisma from "../../config/prisma.js";

export const createProductService = async (data) => {
  const { title, price, categoryName, userId, stock, images, description } = data;

  if (!title || !price || stock === undefined) {
    throw new Error("Title, price and stock are required");
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new Error("At least 1 image is required");
  }

  if (images.length > 3) {
    throw new Error("Maximum 3 images allowed");
  }

  let category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName },
    });
  }

  const product = await prisma.product.create({
    data: {
      title,
      description: description ? description.trim() : null,
      price: Number(price),
      thumbnail: images[0],
      categoryId: category.id,
      userId,
      stock: Number(stock),
    },
  });

  await prisma.productImage.createMany({
    data: images.map((img) => ({
      imageUrl: img,
      productId: product.id,
    })),
  });

  return await prisma.product.findUnique({
    where: { id: product.id },
    include: {
      category: true,
      images: true,
    },
  });
};