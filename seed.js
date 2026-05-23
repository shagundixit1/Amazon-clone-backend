import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // create category
  const category = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: {
        name: "Electronics"
    }
});

  // create product
  const product = await prisma.product.create({
    data: {
      title: "iPhone 14",
      description: "Apple smartphone",
      brand: "Apple",
      price: 799,
      stock: 50,
      categoryId: category.id
    }
  });

  console.log("Seeded successfully:", product);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });