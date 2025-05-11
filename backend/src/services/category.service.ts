import { db } from '../db';
import { DesignType } from '@prisma/client';

export const getAllCategoriesService = async (type?: DesignType) => {
  try {
    let categories;
    if (type) {
      categories = await db.designCategory.findMany({
        where: { designType: type }
      });
    } else {
      categories = await db.designCategory.findMany();
    }
    return categories;
  } catch (error: any) {
    console.error(
      "Error fetching categories in service:",
      error.stack
    );
    throw new Error('Failed to fetch categories');
  }
};

export const getSubCategoriesByCategoryNameService = async (categoryName: string) => {
  try {
    const subCategories = await db.subCategory.findMany({
      where: { designCategory: { name: categoryName } },
      include: { designCategory: true } // Optional: if you want to include parent category details
    });
    return subCategories;
  } catch (error: any) {
    console.error(
      "Error fetching subcategories by category name in service:",
      error.stack
    );
    throw new Error('Failed to fetch subcategories by category name');
  }
};

// You can add other category/subcategory related service functions here
// For example: export const getAllCategoriesService = async () => { ... };
