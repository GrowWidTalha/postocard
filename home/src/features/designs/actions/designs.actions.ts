"use server";

import { db } from "../../../db";

export const getAllCategories = async () => {
  try {
    const categories = await db.designCategory.findMany();

    return categories;
  } catch (error) {
    console.log("Something went wrong error fetching categories", error);
  }
};

export const getSubCategoriesByCategoryName = async (name: string) => {
  try {
    const subCategories = await db.subCategory.findMany({
      where: { designCategory: { name: name } },
    });

    return subCategories;
  } catch (error) {
    console.log("Something went wrong error fetching subcategories", error);
  }
};

export const getDesignsBySubCategory = async (subCategoryId: string) => {
  try {
    const designs = await db.design.findMany({
      where: { subCategory: { name: subCategoryId } },
    });

    return designs;
  } catch (error: any) {
    console.log(
      "Something went wrong error fetching designs by subcategory",
      error.stack
    );
  }
};

export const getDesignById = async (id: string) => {
  try {
    const design = await db.design.findFirst({
      where: { id: id, published: true },
    });

    return design
  } catch (error: any) {
    console.log("Something went wrong fetching design: ", error.stack)
  }
};
