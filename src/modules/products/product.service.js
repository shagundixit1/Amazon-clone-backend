// import prisma from "../../config/prisma.js";

// export const createProductService = async (data) => {

//   const { title, price, thumbnail, categoryName, userId, stock, images } = data;

//   if (!title || !price || stock === undefined) {
//     throw new Error("Title, price and stock are required");
//   }

//   if (!images || !Array.isArray(images) || images.length === 0) {
//     throw new Error("At least 1 image is required");
//   }

//   if (images.length > 3) {
//     throw new Error("Maximum 3 images allowed");
//   }

//   let category = await prisma.category.findUnique({
//     where: { name: categoryName },
//   });

//   if (!category) {
//     category = await prisma.category.create({
//       data: { name: categoryName },
//     });
//   }

//   const product = await prisma.product.create({
//     data: {
//       title: title,
//       price: Number(price),
//       thumbnail: images[0], // first image = thumbnail
//       categoryId: category.id,
//       userId: userId,
//       stock: Number(stock),

//       images: {
//         create: images.map((img) => ({
//           imageUrl: img,
//         })),
//       },
//     },
//     include: {
//       category: true,
//       images: true,
//     },
//   });

//   return product;
// };





import prisma from "../../config/prisma.js";

export const createProductService = async (data) => {
  const { title, price, categoryName, userId, stock, images } = data;

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

  // ✅ STEP 1: CREATE PRODUCT FIRST
  const product = await prisma.product.create({
    data: {
      title,
      price: Number(price),
      thumbnail: images[0], // first image
      categoryId: category.id,
      userId,
      stock: Number(stock),
    },
  });

  // ✅ STEP 2: MANUALLY INSERT IMAGES (IMPORTANT FIX)
  await prisma.productImage.createMany({
    data: images.map((img) => ({
      imageUrl: img,
      productId: product.id,
    })),
  });

  // ✅ STEP 3: RETURN FULL PRODUCT WITH IMAGES
  const fullProduct = await prisma.product.findUnique({
    where: { id: product.id },
    include: {
      category: true,
      images: true,
    },
  });

  return fullProduct;
};