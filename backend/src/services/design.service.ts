import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDesignsBySubCategoryService = async (subCategoryId: string) => {
  try {
    const designs = await prisma.design.findMany({
      where: { subCategory: { name: subCategoryId } }, // Assuming subCategory name is unique
                                                       // or you might need to use subCategory ID directly if available
    });
    return designs;
  } catch (error: any) {
    console.error(
      "Error fetching designs by subcategory in service:",
      error.stack
    );
    // Re-throw the error or return a specific error object to be handled by the controller
    throw new Error('Failed to fetch designs by subcategory');
  }
};
