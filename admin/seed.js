import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const userId = "cm53madwz0000w59k9qvohqoe";

  // Seed DesignCategories and SubCategories
  const designCategories = await prisma.designCategory.createMany({
    data: [
      { name: "Occasions", designType: "OCCASION" },
      { name: "Holidays", designType: "HOLIDAY" },
    ],
  });

  const occasionCategory = await prisma.designCategory.findFirst({
    where: { name: "Occasions" },
  });

  const holidayCategory = await prisma.designCategory.findFirst({
    where: { name: "Holidays" },
  });

  const subCategories = await prisma.subCategory.createMany({
    data: [
      { name: "Weddings", designCategoryId: occasionCategory?.id || "" },
      { name: "Birthdays", designCategoryId: occasionCategory?.id || "" },
      { name: "Christmas", designCategoryId: holidayCategory?.id || "" },
      { name: "New Year", designCategoryId: holidayCategory?.id || "" },
    ],
  });

  // Fetch SubCategory IDs
  const weddingSubCategory = await prisma.subCategory.findFirst({
    where: { name: "Weddings" },
  });

  const birthdaySubCategory = await prisma.subCategory.findFirst({
    where: { name: "Birthdays" },
  });

  const christmasSubCategory = await prisma.subCategory.findFirst({
    where: { name: "Christmas" },
  });

  // Seed Designs
  await prisma.design.createMany({
    data: [
      {
        userId,
        designType: "OCCASION",
        status: "PENDING",
        name: "Wedding Invitation",
        description: "Elegant wedding invitation design.",
        pdfLink: "https://example.com/wedding-invitation.pdf",
        thumbnailUrl: "https://source.unsplash.com/random/200x200?wedding",
        designCategoryId: occasionCategory?.id || "",
        subCategoryId: weddingSubCategory?.id || null,
      },
      {
        userId,
        designType: "OCCASION",
        status: "APPROVED",
        name: "Birthday Card",
        description: "Vibrant birthday card design.",
        pdfLink: "https://example.com/birthday-card.pdf",
        thumbnailUrl: "https://source.unsplash.com/random/200x200?birthday",
        designCategoryId: occasionCategory?.id || "",
        subCategoryId: birthdaySubCategory?.id || null,
      },
      {
        userId,
        designType: "HOLIDAY",
        status: "DISABLED",
        name: "Christmas Greeting",
        description: "Festive Christmas greeting design.",
        pdfLink: "https://example.com/christmas-greeting.pdf",
        thumbnailUrl: "https://source.unsplash.com/random/200x200?christmas",
        designCategoryId: holidayCategory?.id || "",
        subCategoryId: christmasSubCategory?.id || null,
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
