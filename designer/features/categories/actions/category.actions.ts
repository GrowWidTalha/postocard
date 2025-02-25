"use server";

import { db } from "@/db";
import { DesignType } from "@prisma/client";
export const deleteCategory = async (categoryId: string) => {
  try {
    // Delete all subcategories related to the category
    await db.subCategory.deleteMany({
      where: { designCategoryId: categoryId },
    });

    // Delete all designs related to the category
    await db.design.deleteMany({
      where: { designCategoryId: categoryId },
    });

    // Delete the category
    const deletedCategory = await db.designCategory.delete({
      where: { id: categoryId },
    });
    return deletedCategory;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const deleteSubCategory = async (subCategoryId: string) => {
  try {
    // Delete all designs related to the subcategory
    await db.design.deleteMany({
      where: { subCategoryId: subCategoryId },
    });

    // Delete the subcategory
    const deletedSubCategory = await db.subCategory.delete({
      where: { id: subCategoryId },
    });
    return deletedSubCategory;
  } catch (error) {
    console.error("Failed to delete subcategory:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};




export const createSubCategory = async (
  name: string,
  categoryId: string,
  thumbnailUploadId: string,
  thumbnailUrl: string,
) => {
  try {
    const newSubCategory = await db.subCategory.create({
      data: {
        name: name,
        designCategoryId: categoryId,
        thumbnailUploadId: thumbnailUploadId,
        thumbnailUrl: thumbnailUrl
      },
    });
    return newSubCategory;
  } catch (error) {
    console.error("Failed to create subcategory:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};



export const getAllCategories = async () => {
  try {
    const categories = await db.designCategory.findMany({
      include: {
        designs: true,
        subCategories: true,
      },
    });

    return categories;
  } catch (error) {}
};
export const getSubCategoriesByCategory = async (categoryId: string) => {
  try {
    const subCategories = await db.subCategory.findMany({
      where: { designCategoryId: categoryId },
      include: {
          designs: true,
      },
    });

    return subCategories;
  } catch (error) {
    console.error("Failed to get subcategories by category:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const createCategory = async (
  name: string,
  thumbnailUrl: string,
  thumbnailUploadId: string,
  designType: DesignType
) => {
    console.log({
        name, thumbnailUrl, thumbnailUploadId, designType
    })
  try {
    const newCategory = await db.designCategory.create({
      data: {
        name: name,
        thumbnailUploadId: thumbnailUploadId,
        thumbnailUrl: thumbnailUrl,
        designType: designType,
      },
    });
    return newCategory;
  } catch (error: any) {
    console.error("Failed to create category:", error.stack);
    throw error; // Rethrow the error to be handled by the caller
  }
};
